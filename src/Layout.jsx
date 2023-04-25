import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
const Layout = () => {
    return (
        <div className="bg-neutral-100">
            <Navbar />

            <Outlet />
        </div>
    );
};

export default Layout;
