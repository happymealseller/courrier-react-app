import { NavLink } from "react-router-dom"

export function Logo() {
    return (
        <NavLink 
            to="/"
            className="inline-flex p-2 text-white text-2xl font-bold uppercase tracking-widest items-center"
        >
            FDM Express
        </NavLink>
    )
}