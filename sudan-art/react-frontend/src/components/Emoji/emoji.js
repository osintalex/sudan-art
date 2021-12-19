import React from "react";

export default function Emoji(props) {
  return (
    <>
      <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        style={{ fontSize: props.fontSize }}
        id={props.id}
      >
        {props.symbol}
      </span>
    </>
  );
}
