import { Link } from "react-router-dom"
import logo from "../imgs/logo.png"
import AnimationWrapper from "../common/page-animation"

const BlogEditor = () => {


    return (
        <>
            <nav className="navbar" >
                <Link to="/" className="flex-none w-10">
                    <img src={logo}></img>
                </Link>
                <p className="max-md:hidden text-black line-clamp-1 w-full">
                    NEw blog
                </p>

                <div className="flex gap-4 ml-auto">

                    <button className="btn-dark py-2">
                        Publish
                    </button>

                    <button className="btn-light py-2">
                        Save draft
                    </button>
                </div>
            </nav>
            <AnimationWrapper>
                <section>
                    <div className="mx-auto max-w-[900px] w-full">
                        <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80">
                            <label></label>
                        </div>
                    </div>
                    </section>
            </AnimationWrapper>
        </>
    )
}
export default BlogEditor