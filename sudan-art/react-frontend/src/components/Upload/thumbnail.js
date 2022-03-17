import PropTypes from "prop-types";
import React from "react";

/**
 * Simple thumbnail component to show a preview of the image when uploaded successfully.
 * @param {props} props file, handed down from parent upload component which manages state
 * of uploaded file
 * @return {component} image thumbnail component.
 */
function Thumbnail(props) {
  if (props.file instanceof File) {
    return (
      <div className="tag-container">
        <img
          aria-label="image-preview"
          src={URL.createObjectURL(props.file)}
          alt={props.file.name}
          height={200}
          width={200}
          style={{ marginTop: "0.3rem", border: "2px solid #292f3a" }}
        />
      </div>
    );
  } else {
    return null;
  }
}

Thumbnail.propTypes = {
  file: PropTypes.object.isRequired,
};
export default Thumbnail;
