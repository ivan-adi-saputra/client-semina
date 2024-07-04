import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PageSignin from "./pages/signin";
import PageDashboard from "./pages/dashboard";
import PageCategories from "./pages/categories";
import CategoriesCreate from "./pages/categories/create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageDashboard />} />
        <Route path="/categories" element={<PageCategories />} />
        <Route path="/categories/create" element={<CategoriesCreate />} />
        <Route path="/signin" element={<PageSignin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
