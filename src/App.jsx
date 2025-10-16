import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <Suspense>
      <div className="bg-pink-100">
        <Header />
        <main className="min-h-[78vh] flex justify-center items-center my-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
