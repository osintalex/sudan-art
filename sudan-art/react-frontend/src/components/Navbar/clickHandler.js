/**
 * Utility function to handle navigation
 * @param {string} routeName name of the route
 * @param {Object} navigate result of destructuring useNavigate hook in desktopNavigation.js
 * and mobileNavigation.js
 */
export function handleClick(routeName, navigate) {
  switch (routeName) {
    case "About":
      navigate("/mrhaba");
      break;
    case "Home":
      navigate("/");
      break;
    case "Contact":
      navigate("/contact");
      break;
    case "Upload":
      navigate("/create");
      break;
    case "Search":
      navigate("/search");
      break;
    case "Browse":
      navigate("/browse");
      break;
    default:
      navigate("/404");
  }
}
