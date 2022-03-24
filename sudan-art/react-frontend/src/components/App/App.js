import "../CSS/reset.css";
import "../CSS/landing.css";
import "../CSS/contact.css";
import "../CSS/introduction.css";
import "../CSS/landing.css";
import "../CSS/media.css";
import "../CSS/search.css";
import "../CSS/upload.css";
import "../CSS/nav.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageContext } from "../../multilingualContext/context";
import Browse from "../Browse/browse.js";
import Contact from "../Contact/contact.js";
import Introduction from "../Intro/intro.js";
import LandingPage from "../Landing/landing.js";
import NotFound from "../NotFound/notFound.js";
import Search from "../Search/search.js";
import Upload from "../Upload/upload.js";

/**
 * Main app component along with client side routing from React Router DOM.
 * @return {component} the application.
 */
function App() {
  const [language, setLanguage] = useState("english");

  /**
   * Switch to change the language from Arabic to English. It's in App.js since that way I can pass state down
   * to the whole app using the language context provider.
   */
  function toggleLanguage() {
    setLanguage((language) => (language === "english" ? "arabic" : "english"));
  }
  language === "english"
    ? (document.getElementsByTagName("html")[0].style.direction = "ltr")
    : (document.getElementsByTagName("html")[0].style.direction = "rtl");
  return (
    <>
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route exact path="/" element={<LandingPage />}></Route>
            <Route exact path="/mrhaba" element={<Introduction />}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/create" element={<Upload />}></Route>
            <Route exact path="/search" element={<Search />}></Route>
            <Route exact path="/browse" element={<Browse />}></Route>
          </Routes>
        </BrowserRouter>
      </LanguageContext.Provider>
    </>
  );
}

export default App;
