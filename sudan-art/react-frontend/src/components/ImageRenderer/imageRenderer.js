import React, { useState } from "react";
import placeholder from "../Navbar/eye_logo.png";

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
        ></img>
      ) : (
        <img
          alt={props.alt}
          src={placeholder}
          onLoad={handleOnLoad}
          className={props.className}
          onClick={props.onClick}
        ></img>
      )}
    </>
  );
}
