import { CourierDashboard, CourierDashboardProps } from '../components/dashboard/CourierDashboard';

export function CourierDashboardPage({sendDataToApp}: CourierDashboardProps) {
    return (
        <>
            <CourierDashboard sendDataToApp={sendDataToApp} />
        </>
    )
}