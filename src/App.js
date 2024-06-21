import React from 'react';
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
function App() {
  return (
    <HashRouter>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Shop></Shop>} />
        <Route path="/shop" element={<Shop></Shop>} />
        <Route path="/review" element={<Review></Review>} />
        <Route path="/inventory" element={<Inventory></Inventory>} />
        <Route path="/product/:productId" element={<ProductDetail></ProductDetail>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </HashRouter>
  );
}
export default App;
