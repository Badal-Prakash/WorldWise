import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/pricing";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./component/cityList";
import City from "./component/city";
import Form from "./component/Form";
// import { useEffect, useState } from "react";
import CountryList from "./component/countriesList";
import { CitiesProvider } from "./Contexts/CitiesContexts";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout></AppLayout>}>
            <Route
              index
              element={<Navigate to="cities"/>}
            />
            <Route
              path="cities"
              element={<CityList/>}
            />
            <Route path='cities/:id' element={<City/>}/>
            <Route path="countries" element={<CountryList/>} />
            <Route path="form" element={<p><Form/></p>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
