import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNot from "./pages/PageNot";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Vehicle from "./pages/Admin/Vehicle";
import UpdateVehicle from "./pages/Admin/UpdateVehicle";
import Search from "./pages/Search";
import VehicleDetails from "./pages/VehicleDetails";
import PaymentSuccess from "./pages/user/PaymentSuccess";
import AdminOrders from "./pages/Admin/AdminOrders";
import UpdateUser from "./pages/Admin/updateUser";
import PaymentCancelled from "./pages/user/PaymentCancelled";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancelled" element={<PaymentCancelled />} />

        <Route path="/product/:slug" element={<VehicleDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateVehicle />} />
          <Route path="admin/product" element={<Vehicle />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/update-user/:id" element={<UpdateUser />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNot />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
