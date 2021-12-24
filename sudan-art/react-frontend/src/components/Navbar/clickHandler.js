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
    default:
      navigate("/404");
  }
}
