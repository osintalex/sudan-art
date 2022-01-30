import React, { useState } from "react";
import placeholder from "../Navbar/eye_logo.svg";

/**
 * Made this so that images show an eye logo as a placeholder before rendering.
 * @param {React Component Props} props alt, src, className, onClick handler, label
 * @returns an <img> tag with fallback rendering
 */
export default function ImageRenderer(props) {
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
          style={{ filter: "invert(1)"}}
        ></img>
      )}
    </>
  );
}
