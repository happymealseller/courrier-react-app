import { NavBar } from "./components/navbar/NavBar"
import TrackSearchBarPage from "./pages/TrackSearchBarPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { ShippingFormPage } from "./pages/ShippingFormPage"
import { RegisterPage } from "./pages/RegisterPage"
import { NotFound } from "./pages/NotFoundPage"
import { CourierDashboardPage } from "./pages/CourierDashboardPage"
import "./css/Navbar.css"
import { useEffect, useState } from "react"
import { areAllKeysEmptyStrings } from "./utilities/areAllValuesEmptyString"
import { SenderDashboardPage } from "./pages/SenderDashboardPage"
import { Logout } from "./components/logout/Logout"

export type LocalStorageData = {
	jwt: string,
	accountType: string,
	username: string
}
const initialLocalStorageData: LocalStorageData = {
	jwt: "",
	accountType: "",
	username: ""
}
function App() {
	const [dataFromCourierDashboard, setDataFromCourierDashboard] = useState<LocalStorageData>(initialLocalStorageData);
	const [dataFromSenderDashboard, setDataFromSenderDashboard] = useState<LocalStorageData>(initialLocalStorageData);
	const [isCourierLoggedIn, setIsCourierLoggedIn] = useState(false);
	const [isSenderLoggedIn, setIsSenderLoggedIn] = useState(false);

	const handleDataFromCourierDashboard = (data: LocalStorageData) => {
		setDataFromCourierDashboard({
			...dataFromCourierDashboard,
			...data
		});
	};

	const handleDataFromSenderDashboard = (data: LocalStorageData) => {
		setDataFromSenderDashboard({
			...dataFromSenderDashboard,
			...data
		});
	};

	const handleDataFromLogout = (isCourier: boolean, data: LocalStorageData = initialLocalStorageData) => {
		isCourier ? setDataFromCourierDashboard(data) : setDataFromSenderDashboard(data);
	}

	useEffect(() => {
		setIsCourierLoggedIn(!areAllKeysEmptyStrings(dataFromCourierDashboard));
	}, [dataFromCourierDashboard])

	useEffect(() => {
		setIsSenderLoggedIn(!areAllKeysEmptyStrings(dataFromSenderDashboard));
	}, [dataFromSenderDashboard])

	return (
		<Router>
			<div>
			<header>
				<NavBar isCourierLoggedIn={isCourierLoggedIn} isSenderLoggedIn={isSenderLoggedIn}/>
			</header>
			</div>
			<main className="main-content">
			<div className="flex justify-center">
				<Routes>
				<Route index element={<TrackSearchBarPage />} />
				<Route path="create-a-shipment" element={<ShippingFormPage />} />
				<Route path="track-a-package" element={<TrackSearchBarPage />} />
				<Route path="open-an-account" element={<RegisterPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="logout" element={<Logout sendDataToApp={handleDataFromLogout}/>} />
				<Route path="*" element={<NotFound />} />
				<Route path="dashboard/courier" element={(<CourierDashboardPage sendDataToApp={handleDataFromCourierDashboard}/>)} />
				<Route path="dashboard/sender" element={(<SenderDashboardPage sendDataToApp={handleDataFromSenderDashboard}/>)} />
				</Routes>
			</div>
			</main>
			<footer className="">

			</footer>
		</Router>
	)
}

export default App
