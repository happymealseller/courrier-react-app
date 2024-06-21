import { NavBar } from "./components/navbar/NavBar"
import TrackSearchBarPage from "./pages/TrackSearchBarPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { ShippingFormPage } from "./pages/ShippingFormPage"
import { RegisterPage } from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"
import { CourierDashboardPage } from "./pages/CourierDashboardPage"
import "./css/Navbar.css"
import { SenderDashboardPage } from "./pages/SenderDashboardPage"
import { Logout } from "./components/logout/Logout"
import { ProtectedRoutes } from "./components/security/ProtectedRoutes"
import { NewOrderSummaryPage } from "./pages/NewOrderSummaryPage"
import { AdminUrl, AuthenticationUrl, CourierUrl, CustomerUrl, PublicUrl } from "./utilities/enums/Url"
import { OrderStatusPage } from "./pages/OrderStatusPage"
import { ViewUpdateOrderPage } from "./pages/ViewUpdateOrderPage"
import { AuthenticationState } from "./redux/authentication/authenticationSlice"
import { AdminDashboardPage } from "./pages/AdminDashboardPage"
import { CourierAssignPage } from "./pages/CourierAssignPage"
import AboutUsPage from "./pages/AboutUsPage"
import ContactUsPage from "./pages/ContactUsPage"


export type RootState = {
	authentication: AuthenticationState
}

function App() {
	return (
		<Router>
			<div className="w-full">
			<header className="min-h-[5svh] bg-red-500 flex justify-center items-center">
				<p className="text-white">Alert: COVID-19 cases are on the rise - kindly practice social distancing when interacting with our couriers.</p>
			</header>
			<div>
			<div className="min-h-[10svh]">
				<NavBar />
			</div>
			</div>
			<main className="min-h-[75svh] flex justify-center items-center">
			
				<Routes>
					<Route element={<ProtectedRoutes />}>
						<Route path={CustomerUrl.CREATE_A_SHIPMENT} element={<ShippingFormPage />} />
						<Route path={CourierUrl.VIEW_ORDER} element={<ViewUpdateOrderPage />}/>
						<Route path={CustomerUrl.UPDATE_ORDER} element={<ViewUpdateOrderPage />} />
						<Route path={CustomerUrl.VIEW_ORDER} element={<ViewUpdateOrderPage />} />
						<Route path={CourierUrl.DASHBOARD} element={<CourierDashboardPage />} />
						<Route path={CustomerUrl.DASHBOARD} element={<SenderDashboardPage />} />
						<Route path={CustomerUrl.NEW_ORDER_SUMMARY} element={(<NewOrderSummaryPage />)} />
						<Route path={AdminUrl.DASHBOARD} element={<AdminDashboardPage />} />
						<Route path={AdminUrl.ASSIGN_COURIER} element={<CourierAssignPage />} />
						<Route path={AdminUrl.REGISTER_COURIER} element={<RegisterPage />} />
						<Route path={AuthenticationUrl.LOGOUT} element={<Logout />} />
					</Route>
					<Route index element={<TrackSearchBarPage />} />
					<Route path={PublicUrl.TRACK_A_PACKAGE} element={<TrackSearchBarPage />} />
					<Route path={PublicUrl.ORDER_STATUS} element={<OrderStatusPage />} />
					<Route path={AuthenticationUrl.OPEN_AN_ACCOUNT} element={<RegisterPage />} />
					<Route path={AuthenticationUrl.LOGIN} element={<LoginPage />} />
					<Route path={PublicUrl.ABOUT} element={<AboutUsPage />} />
					<Route path={PublicUrl.CONTACT} element={<ContactUsPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			
			</main>
			<footer className="min-h-[10svh] bg-slate-700 text-sm text-white flex justify-center items-center">
				<p>&copy; 2024 <span className="text-orange-500">FDMX</span> - Your Courier Delivery Service. All Rights Reserved.</p>
			</footer>
			</div>
		</Router>
	)
}

export default App
