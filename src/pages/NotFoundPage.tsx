import { NavLink } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="text-center p-6">
                <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
                <p className="text-xl text-slate-600 mb-8">Oops! Page Not Found</p>
                <NavLink to="/">
                    <span className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-400 transition duration-300">
                        Go Home
                    </span>
                </NavLink>
            </div>
        </div>
    )
}

export default PageNotFound;