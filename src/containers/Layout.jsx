import React from "react";
import Nav from "../components/Nav";
import { getSession } from "/src/Utils/getSession.js";
import Footer from "../components/Footer"

const currentSession = getSession()

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Nav user = {currentSession} />
      {children}
      <Footer />  
    </div>
  );
};

export default Layout;
