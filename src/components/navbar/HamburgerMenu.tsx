type HamburgerMenuProps = {
    toggleOpenNavbar: () => void
}

export function HamburgerMenu({ toggleOpenNavbar }: HamburgerMenuProps) {
    return (
        <button 
            className="inline-flex items-center justify-center text-white border h-10 w-10 ml-auto rounded-md outline-none focus:outline-none lg:hidden"
            onClick={toggleOpenNavbar}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
    )
}