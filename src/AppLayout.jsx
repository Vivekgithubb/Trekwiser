import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function AppLayout() {
  return (
    <div className="h-full w-full">
        <Navbar/>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}
