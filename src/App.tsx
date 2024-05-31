import { NavBar } from "./components/navbar/NavBar"
import TrackSearchBarPage from "./pages/TrackSearchBarPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { ShippingFormPage } from "./pages/ShippingFormPage"
import { RegisterPage } from "./pages/RegisterPage"
import { NotFound } from "./pages/NotFoundPage"
import { CourierDashboardPage } from "./pages/CourierDashboardPage"
import "./css/Navbar.css"
import { SenderDashboardPage } from "./pages/SenderDashboardPage"
import { Logout } from "./components/logout/Logout"
import { ProtectedRoutes } from "./components/security/ProtectedRoutes"
import { NewOrderSummaryPage } from "./pages/NewOrderSummaryPage"
import { AuthenticationUrl, CourierUrl, CustomerUrl, PublicUrl } from "./utilities/enums/Url"
import { OrderStatusPage } from "./pages/OrderStatusPage"
import { ViewUpdateOrderPage } from "./pages/ViewUpdateOrderPage"
import { AuthenticationState } from "./redux/authentication/authenticationSlice"


export type RootState = {
	authentication: AuthenticationState
}

function App() {
	return (
		<Router>
			<div>
				<header>
					<NavBar />
				</header>
			</div>
			<main className="main-content">
			<div className="flex justify-center">
				<Routes>
					<Route element={<ProtectedRoutes />}>
						<Route path={CustomerUrl.CREATE_A_SHIPMENT} element={<ShippingFormPage />} />
						{/* <Route path={CourierUrl.UPDATE_ORDER} element={<ViewUpdateOrderPage />} />
						<Route path={CourierUrl.VIEW_ORDER} element={<ViewUpdateOrderPage />}/>        To activate after status page desgined*/}
						<Route path={CustomerUrl.UPDATE_ORDER} element={<ViewUpdateOrderPage />} />
						<Route path={CustomerUrl.VIEW_ORDER} element={<ViewUpdateOrderPage />} />
						<Route path={CourierUrl.DASHBOARD} element={<CourierDashboardPage />} />
						<Route path={CustomerUrl.DASHBOARD} element={<SenderDashboardPage />} />
						<Route path={CustomerUrl.NEW_ORDER_SUMMARY} element={(<NewOrderSummaryPage />)} />
						<Route path={AuthenticationUrl.LOGOUT} element={<Logout />} />
					</Route>
					<Route index element={<TrackSearchBarPage />} />
					<Route path={PublicUrl.TRACK_A_PACKAGE} element={<TrackSearchBarPage />} />
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
