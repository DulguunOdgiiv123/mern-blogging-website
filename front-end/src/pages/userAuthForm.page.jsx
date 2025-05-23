import { Link } from "react-router-dom";
import InputBox from "../components/input.component"
import googleIcon from "../imgs/google.png"
import AnimationWrapper from "../common/page-animation";
import { useContext, useRef } from "react";
import { toast, Toaster } from "react-hot-toast"
import axios from "axios"
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import { authWithGoogle } from "../common/firebase";


const UserAuthForm = ({ type }) => {

    const authForm = useRef();

    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext)

    console.log(access_token)

    
    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
            .then(({ data }) => {
                storeInSession("user", JSON.stringify(data))
                setUserAuth(data)
            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            })
    }

    const handleSubmit = (e) => {

        let serverRoute = type == "sign-in" ? "/signin" : "/signup"
        e.preventDefault();

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password;

        let form = new FormData(formElement)
        let formData = {};

        for (let [key, value] of form.entries()) {
            formData[key] = value
        }

        let { fullname, email, password } = formData

        if (fullname) {
            if (fullname.length < 6) {
                return toast.error("Fullname must be at least 6 letters")
            }
        }
        if (!email.length) {
            return toast.error("Enter email")
        }
        if (!emailRegex.test(email)) {
            return toast.error("Email invalid")
        }
        if (!passwordRegex.test(password)) {
            return toast.error("Password should 6 to 20 charecters long with num, lowercase uppercase")
        }
        userAuthThroughServer(serverRoute, formData)
    }

    const handleGoogleAuth = (e) => {

        e.preventDefault()
 
        authWithGoogle().then(user => {

            let serverRoute = "/google-auth"

            let formData = {
                access_token: user.access_token
            }

            userAuthThroughServer(serverRoute,formData)

        })
        .catch(err => {
        toast.error("cannot login")
        return console.log(err)
    })
    }

    return (
        access_token ?
            <Navigate to="/" />
            :
            <AnimationWrapper keyValue={type}>
                <section className="h-cover flex items-center justify-center" >
                    <Toaster />
                    <form id="formElement" className="w-[80%] max-w-[400px]">
                        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                            {type == "sign-in" ? "Welcome back" : "Join us now"}
                        </h1>

                        {
                            type != "sign-in" ?
                                <InputBox
                                    name="fullname"
                                    type="text"
                                    placeholder="Full Name"
                                    icon="fi-rr-user"
                                />
                                : ""
                        }

                        <InputBox
                            name="email"
                            type="text"
                            placeholder="Email"
                            icon="fi-rr-envelope"
                        />

                        <InputBox
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon="fi-rr-lock"

                        />

                        <button onClick={handleSubmit} className="btn-dark center mt-14" type="submit">
                            {type.replace("-", " ")}
                        </button>

                        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                            <hr className="w-1/2 border-black"></hr>
                            <p>or</p>
                            <hr className="w-1/2 border-black"></hr>
                        </div>


                        <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center" onClick={handleGoogleAuth}>
                            <img src={googleIcon} className="w-5" />
                            Sign up with Google
                        </button>

                        {
                            type == "sign-in" ?
                                <p className="mt-6 text-dark-grey text-xl text-center">
                                    Don't have an account ?
                                    <Link to="/signup" className="underline text-black text-xl ml-1">
                                        Join us today
                                    </Link>
                                </p>
                                :

                                <p className="mt-6 text-dark-grey text-xl text-center ml-1">
                                    Already a member ?
                                    <Link to="/signin" className="underline text-black">
                                        Sign in here
                                    </Link>
                                </p>
                        }
                    </form>
                </section>
            </AnimationWrapper>

    )
}
export default UserAuthForm;