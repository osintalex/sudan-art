import React from "react";
import LandingPage from "../Landing/landing.js";
import Introduction from "../Intro/intro.js";
import Contact from "../Contact/contact.js";
import Upload from "../Upload/upload.js";
import Search from "../Search/search.js";
import NotFound from "../NotFound/notFound.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../CSS/reset.css";
import "../CSS/landing.css";
import "../CSS/contact.css"
import "../CSS/introduction.css";
import "../CSS/landing.css";
import "../CSS/media.css"
import "../CSS/search.css"
import "../CSS/upload.css";
import "../CSS/nav.css";

/**
 * Main app component along with client side routing from React Router DOM.
 */
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/mrhaba" element={<Introduction />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/create" element={<Upload />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
