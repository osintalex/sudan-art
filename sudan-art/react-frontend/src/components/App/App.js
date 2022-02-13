import "../CSS/reset.css";
import "../CSS/landing.css";
import "../CSS/contact.css";
import "../CSS/introduction.css";
import "../CSS/landing.css";
import "../CSS/media.css";
import "../CSS/search.css";
import "../CSS/upload.css";
import "../CSS/nav.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../Landing/landing.js";
import Introduction from "../Intro/intro.js";
import Contact from "../Contact/contact.js";
import Upload from "../Upload/upload.js";
import Search from "../Search/search.js";
import NotFound from "../NotFound/notFound.js";
import Browse from "../Browse/browse.js";
import { LanguageContext } from "../../multilingualContext/context";

/**
 * Main app component along with client side routing from React Router DOM.
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
