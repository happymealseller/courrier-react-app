import "./css/Navbar.css"
import AppRoutes from "./AppRoutes"
import { NavBar } from "./components/navbar/NavBar"
import { AuthenticationState } from "./redux/authentication/authenticationSlice"

export type RootState = {
	authentication: AuthenticationState
}

function App() {
	return (<>
		<div>
			<header>
				<NavBar />
			</header>
		</div>
		<main className="main-content">
			<div className="flex justify-center">
				<AppRoutes />
			</div>
		</main>
	</>)
}

export default App