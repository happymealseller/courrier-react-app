import { NavBar } from "./components/navbar/NavBar"
import TrackSearchBarPage from "./pages/TrackSearchBarPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { ShippingFormPage } from "./pages/ShippingFormPage"
import { RegisterPage } from "./pages/RegisterPage"
import { NotFound } from "./pages/NotFoundPage"
import { CourierDashboardPage } from "./pages/CourierDashboardPage"
import "./css/Navbar.css"

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
            <Route index element={<TrackSearchBarPage />} />
            <Route path="create-a-shipment" element={<ShippingFormPage />} />
            <Route path="track-a-package" element={<TrackSearchBarPage />} />
            <Route path="open-an-account" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="dashboard/courier" element={<CourierDashboardPage />} />
          </Routes>
        </div>
      </main>
      <footer>

      </footer>
    </Router>
  )
}

export default App
