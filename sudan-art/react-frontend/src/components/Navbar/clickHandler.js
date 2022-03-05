/**
 * Utility function to handle navigation
 * @param {string} routeName name of the route
 * @param {Object} navigate result of destructuring useNavigate hook in desktopNavigation.js
 * and mobileNavigation.js
 */
export function handleClick(routeName, navigate) {
  switch (routeName) {
    case "nav_about":
      navigate("/mrhaba");
      break;
    case "Home":
      navigate("/");
      break;
    case "nav_contact":
      navigate("/contact");
      break;
    case "nav_upload":
      navigate("/create");
      break;
    case "nav_search":
      navigate("/search");
      break;
    case "nav_browse":
      navigate("/browse");
      break;
    default:
      navigate("/404");
  }
}
