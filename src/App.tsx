import "./css/Navbar.css"
import AppRoutes from "./AppRoutes"
import { NavBar } from "./components/navbar/NavBar"
import { AuthenticationState } from "./redux/authentication/authenticationSlice"

export type RootState = {
	authentication: AuthenticationState
}

function App() {
	return (
		<div className="w-full h-[100svh] bg-slate-700">
			<NavBar />
			<AppRoutes />
		</div>
	)
}

export default App