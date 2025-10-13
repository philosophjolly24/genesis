import "../globals.css";
import Navbar from "../components/Navbar";
import { ItemProvider } from "../context/appContext";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <ItemProvider>
      <div className="flex items-center justify-between mb-10 sticky inset-0 z-20 bg-background-white ">
        <Navbar />
        <Link to={"/"} className="m-auto">
          <h1 className="font-open-sans text-[38px] font-extrabold text-brand text-center block w-fit m-auto">
            Genesis
          </h1>
        </Link>
      </div>
      <main className="w-full max-w-[1200px] m-auto pl-3 pr-3">
        <Outlet />
      </main>
    </ItemProvider>
  );
}
