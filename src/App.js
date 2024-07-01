import React, { createContext, useState } from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Shop from './components/Shop/Shop';
import {
  HashRouter,
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

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <HashRouter>
        <p>Email: {loggedInUser.name} </p>

        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Shop></Shop>} />
          <Route path="/shop" element={<Shop></Shop>} />
          <Route path="/review" element={<Review></Review>} />
          <Route path="/inventory" element={<Inventory></Inventory>} />
          <Route path="/shipment" element={<PrivateRoute></PrivateRoute>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/product/:productId" element={<ProductDetail></ProductDetail>} />
          <Route path="*" element={<NotFound></NotFound>} />

        </Routes>

      </HashRouter>
    </UserContext.Provider>
  );
}
export default App;
