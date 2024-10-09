import React, { createContext, useState } from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Shop from './components/Shop/Shop';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUserShared, setLoggedInUserShared] = useState({});

  return (
    <UserContext.Provider value={[loggedInUserShared, setLoggedInUserShared]}>
      <BrowserRouter>
        <p>Email: {loggedInUserShared.name} </p>

        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Shop></Shop>} />
          <Route path="/shop" element={<Shop></Shop>} />
          <Route path="/review" element={<Review></Review>} />
          <Route path="/inventory" element={
            <PrivateRoute Component={Inventory} />
          } />
          <Route path="/shipment" element={
            <PrivateRoute Component={Shipment} />
          } />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/product/:productId" element={<ProductDetail></ProductDetail>} />
          <Route path="*" element={<NotFound></NotFound>} />

        </Routes>

      </BrowserRouter>
    </UserContext.Provider >
  );
}
export default App;
