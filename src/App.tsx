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
import { ProtectedRoutes } from "./components/security/ProtectedRoutes"
import { NewOrderSummaryPage } from "./pages/NewOrderSummaryPage"
import { LocalStorageData } from "./utilities/type-aliases/app/LocalStorageData"
import { AuthenticationUrl, CourierUrl, CustomerUrl, PublicUrl } from "./utilities/enums/Url"
import { OrderStatusPage } from "./pages/OrderStatusPage"

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
					<Route element={<ProtectedRoutes />}>
						<Route path={CustomerUrl.CREATE_A_SHIPMENT} element={<ShippingFormPage />} />
						<Route path={CourierUrl.DASHBOARD} element={(<CourierDashboardPage sendDataToApp={handleDataFromCourierDashboard}/>)} />
						<Route path={CustomerUrl.DASHBOARD} element={(<SenderDashboardPage sendDataToApp={handleDataFromSenderDashboard}/>)} />
						<Route path={CustomerUrl.NEW_ORDER_SUMMARY} element={(<NewOrderSummaryPage />)} />
						<Route path={AuthenticationUrl.LOGOUT} element={<Logout sendDataToApp={handleDataFromLogout}/>} />
					</Route>
					<Route index element={<TrackSearchBarPage />} />
					<Route path={PublicUrl.TRACK_A_PACKAGE} element={<h1>order</h1>} />
					<Route path={PublicUrl.ORDER_STATUS} element={<OrderStatusPage />} />
					<Route path={AuthenticationUrl.OPEN_AN_ACCOUNT} element={<RegisterPage />} />
					<Route path={AuthenticationUrl.LOGIN} element={<LoginPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
			</main>
			<footer className="">

			</footer>
		</Router>
	)
}

export default App
