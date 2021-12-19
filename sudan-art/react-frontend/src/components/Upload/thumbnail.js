import React from "react";

export default function Thumbnail(props) {
  if (props.file) {
    return (
      <div className="tag-container">
        <img
          src={props.file ? URL.createObjectURL(props.file) : null}
          alt={props.file ? props.file.name : null}
          height={props.file ? 200 : null}
          width={props.file ? 200 : null}
          style={
            props.file
              ? {
                  marginTop: "0.3rem",
                  border: "2px solid #292f3a"

                }
              : null
          }
        />
      </div>
    );
  }
  else {return null}
}
