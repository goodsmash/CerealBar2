import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingShapes } from "../ui/floating-shapes";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow relative pt-16">
        <FloatingShapes />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
