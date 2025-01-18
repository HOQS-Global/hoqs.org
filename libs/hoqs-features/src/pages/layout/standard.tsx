import { MainContent } from "@hoqs/core-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";

export const StandardLayout = ({ children }) => 
  <div className="min-w-screen min-h-screen flex relative items-center flex-col">
    <ScrollRestoration scrollBehavior="instant" />
    <Navbar/>
    <MainContent>
      <Outlet/>
      {children}
    </MainContent>
    <Footer/>
  </div>