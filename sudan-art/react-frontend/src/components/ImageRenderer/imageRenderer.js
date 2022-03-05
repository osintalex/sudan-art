import PropTypes from "prop-types";
import React, { useState } from "react";
import placeholder from "../Navbar/eye_logo.svg";

/**
 * Made this so that images show an eye logo as a placeholder before rendering.
 * @param {props} props alt, src, className, onClick handler, label
 * @return {component} component for rendering images with fallback rendering.
 */
function ImageRenderer(props) {
  const [loading, setLoading] = useState(false);

  const handleOnLoad = () => {
    setLoading(true);
  };

  return (
    <>
      {loading ? (
        <img
          alt={props.alt}
          src={props.src}
          onLoad={handleOnLoad}
          className={props.className}
          onClick={props.onClick}
          aria-label={props.label}
        ></img>
      ) : (
        <img
          alt={props.alt}
          src={placeholder}
          onLoad={handleOnLoad}
          className={props.className}
          onClick={props.onClick}
          aria-label={props.label}
        ></img>
      )}
    </>
  );
}
ImageRenderer.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
export default ImageRenderer;
