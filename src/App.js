import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cart from "./pages/CartPage";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import CheckOutPage from "./pages/CheckOutPage";
import AppStore from "./context/AppStore";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="dark:bg-slate-700 dark:text-white min-h-screen">
      <AppStore>
        <Toaster />
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="checkout" element={<CheckOutPage />} />
        </Routes>
      </AppStore>
    </div>
  );
}

export default App;
