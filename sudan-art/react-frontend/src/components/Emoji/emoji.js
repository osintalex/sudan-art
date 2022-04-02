import PropTypes from "prop-types";
import React from "react";
import SudanFlag from "../../images/sudan-flag.svg";

/**
 * Emoji component. Read in a few places that it's better to put it in a span tag for accessibility
 * @param {props} props label, font size for emoji size, id for styling and symbol for the emoji
 * @return {component} a span tag containing an emoji.
 */
function Emoji(props) {
  return (
    <>
      <span
        className="emoji"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        style={{ fontSize: props.fontSize }}
        id={props.id}
      >
        {/* Flags only render on mac so I'm using a custom svg instead */}
        {props.symbol === "🇸🇩" ? (
          <img src={SudanFlag} style={{ width: "2rem", height: "2rem" }} />
        ) : (
          props.symbol
        )}
      </span>
    </>
  );
}
Emoji.propTypes = {
  label: PropTypes.string,
  fontSize: PropTypes.string,
  id: PropTypes.string,
  symbol: PropTypes.string,
};
export default Emoji;
