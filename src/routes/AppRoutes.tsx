import { Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom"
import { ProtectedRoutes } from '../components/security/ProtectedRoutes';
import { AuthenticationUrl, CourierUrl, CustomerUrl, PublicUrl } from "../utilities/enums/Url"
import UpdateShipmentDetails from '../pages/UpdateShipmentDetails';
import AboutUsPage from '@/pages/Public/AboutUsPage';
import ContactUsPage from '@/pages/Public/ContactUsPage';

const AppRoutes = () => {
    const ShippingFormPage = lazy(() => import('@/pages/ShippingFormPage').then(module => ({ default: module.ShippingFormPage })));
    const ViewUpdateOrderPage = lazy(() => import('@/pages/ViewUpdateOrderPage').then(module => ({ default: module.ViewUpdateOrderPage })));
    const CourierDashboardPage = lazy(() => import('@/pages/CourierDashboardPage').then(module => ({ default: module.CourierDashboardPage })));
    const SenderDashboardPage = lazy(() => import('@/pages/SenderDashboardPage').then(module => ({ default: module.SenderDashboardPage })));
    const NewOrderSummaryPage = lazy(() => import('@/pages/NewOrderSummaryPage').then(module => ({ default: module.NewOrderSummaryPage })));
    const Logout = lazy(() => import('@/components/logout/Logout').then(module => ({ default: module.Logout })));
    const TrackSearchBarPage = lazy(() => import('@/pages/Public/TrackSearchBarPage'));
    const RegisterPage = lazy(() => import('@/pages/Authentication/RegisterPage').then(module => ({ default: module.RegisterPage })));
    const LoginPage = lazy(() => import('@/pages/Authentication/LoginPage').then(module => ({ default: module.LoginPage })));
    const PageNotFound = lazy(() => import('@/pages/Public/NotFoundPage'));

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path={CustomerUrl.CREATE_A_SHIPMENT} element={<ShippingFormPage />} />
                    <Route path={CourierUrl.UPDATE_ORDER} element={<ViewUpdateOrderPage />} />
                    <Route path={CourierUrl.VIEW_ORDER} element={<ViewUpdateOrderPage />} />
                    <Route path={CustomerUrl.UPDATE_ORDER} element={<ViewUpdateOrderPage />} />
                    <Route path={CustomerUrl.VIEW_ORDER} element={<ViewUpdateOrderPage />} />
                    <Route path={CourierUrl.DASHBOARD} element={<CourierDashboardPage />} />
                    <Route path={CustomerUrl.DASHBOARD} element={<SenderDashboardPage />} />
                    <Route path={CustomerUrl.NEW_ORDER_SUMMARY} element={(<NewOrderSummaryPage />)} />
                    <Route path={AuthenticationUrl.LOGOUT} element={<Logout />} />
                </Route>
                <Route index element={<TrackSearchBarPage />} />
                {/* <Route index element={<AboutUsPage />} /> */}
                {/* <Route index element={<ContactUsPage />} /> */}
                {/* <Route index element={<UpdateShipmentDetails />} /> */}
                <Route path={PublicUrl.TRACK_A_PACKAGE} element={<TrackSearchBarPage />} />
                <Route path={AuthenticationUrl.OPEN_AN_ACCOUNT} element={<RegisterPage />} />
                <Route path={AuthenticationUrl.LOGIN} element={<LoginPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes;