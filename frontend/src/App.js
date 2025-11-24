import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import FoodDetail from "./pages/FoodDetail";

import Booking from "./components/Booking";
import About from "./pages/About";   
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


import AdminLogin from "./pages/AdminLogin"; // ⭐ THÊM
import AdminDashboard from "./pages/AdminDashboard";
import AdminFoods from "./pages/AdminFoods";
import AdminAddFood from "./pages/AdminAddFood";
import AdminEditFood from "./pages/AdminEditFood";
import AdminBooking from "./pages/AdminBooking";
import AdminContact from "./pages/AdminContacts";




function Layout({ children }) {
  const location = useLocation();

  // ⭐ Ẩn Navbar + Footer ở trang admin
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className={!hideLayout ? "pt-20" : ""}>{children}</div>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* TRANG CHÍNH */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <Menu />
                <About />
                <Booking />
              </>
            }
          />

          {/* MENU */}
          <Route path="/menu" element={<Menu />} />
          {/* CHI TIẾT MÓN ĂN */}
          <Route path="/food/:id" element={<FoodDetail />} />


          {/* ABOUT */}
          <Route path="/about" element={<About />} />

          {/* BOOKING */}
          <Route path="/booking" element={<Booking />} />

          {/* ⭐ TRANG ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* ⭐ TRANG ADMIN DASHBOARD */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* ⭐ TRANG ADMIN FOODS */}
          <Route path="/admin/foods" element={<AdminFoods />} />
          {/* ⭐ TRANG ADMIN ADD FOOD */}
          <Route path="/admin/add-food" element={<AdminAddFood />} />
          {/* ⭐ TRANG ADMIN EDIT FOOD */}
          <Route path="/admin/edit-food/:id" element={<AdminEditFood />} />
          {/* ⭐ TRANG ADMIN BOOKING */}
          <Route path="/admin/bookings" element={<AdminBooking />} />
          {/* ⭐ TRANG ADMIN CONTACT */}
          <Route path="/admin/contacts" element={<AdminContact />} />

          {/* REGISTER */}
          <Route path="/register" element={<Register />} />
          {/* LOGIN */}
          <Route path="/login" element={<Login />} />
          {/* PROFILE */}
          <Route path="/profile" element={<Profile />} />


        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
