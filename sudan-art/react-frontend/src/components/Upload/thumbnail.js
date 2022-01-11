import React from "react";

/**
 * Simple thumbnail component to show a preview of the image when uploaded successfully.
 * @param {React Component Props} props file, handed down from parent upload component which manages state
 * of uploaded file
 * @returns JSX for Thumbnail image; only renders if the file is uploaded
 */
export default function Thumbnail(props) {
  if (props.file) {
    return (
      <div className="tag-container">
        <img
          aria-label="image-preview"
          src={props.file ? URL.createObjectURL(props.file) : null}
          alt={props.file ? props.file.name : null}
          height={props.file ? 200 : null}
          width={props.file ? 200 : null}
          style={
            props.file
              ? {
                  marginTop: "0.3rem",
                  border: "2px solid #292f3a",
                }
              : null
          }
        />
      </div>
    );
  } else {
    return null;
  }
}
