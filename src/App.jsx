import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Contact, Works } from "./pages";
import { CustomCursor, Footer, Navbar } from "./components";

function App() {
  return (
    <Router>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/works" element={<Works />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
