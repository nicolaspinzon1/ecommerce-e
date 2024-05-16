import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../src/containers/Layout";
import Home from "../src/pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Products from "./pages/Search";
import AppContext from "./context/AppContext";
import useInitialState from "../src/hooks/useInitialState";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AboutUs from "./pages/AboutUs";



const App = () => {
  const initialState = useInitialState();

  return (
    //
    <AppContext.Provider value={initialState}>
      <Router>
        <Routes>
          {/* La ruta de inicio, se renderiza con Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/Products"
            element={
              <Layout>
             
                <Products />
              </Layout>
            }
          />
          <Route
            path="/AboutUs"
            element={
               <Layout>
             
                <AboutUs />
               </Layout>
            }
          />
           <Route path="/checkout" element={
           
            <Checkout />
            
           } />
           <Route path="/orders" element={<Layout> 
            <Orders />
           </Layout>} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateAccount />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;