import React from "react";

/**
 * Emoji component. Read in a few places that it's better to put it in a span tag for accessibility
 * @param {React Component Props} props label, font size for emoji size, id for styling and symbol for the emoji
 * @returns a span tag containing an emoji.
 */
export default function Emoji(props) {
  return (
    <>
      <span
        className="emoji"
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
