import "./css/Navbar.css"
import AppRoutes from "./routes/AppRoutes"
import { NavBar } from "./components/navbar/NavBar"

// import { AuthenticationState } from "./redux/authentication/authenticationSlice"

// export type RootState = {
// 	authentication: AuthenticationState
// }

function App() {
	return (
		<div className="w-full">
			<header className="min-h-[5svh] bg-red-500 flex justify-center items-center">
				<p className="text-white">Alert: COVID-19 cases are on the rise - kindly practice social distancing when interacting with our couriers.</p>
			</header>

			<div className="min-h-[10svh]">
				<NavBar />
			</div>

			<div className="min-h-[75svh] flex justify-center items-center">
				<AppRoutes />
			</div>

			<footer className="min-h-[10svh] bg-slate-700 text-sm text-white flex justify-center items-center">
				<p>&copy; 2024 <span className="text-orange-500">FDMX</span> - Your Courier Delivery Service. All Rights Reserved.</p>
			</footer>
		</div>
	)
}

export default App