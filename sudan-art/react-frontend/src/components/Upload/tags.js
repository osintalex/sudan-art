import React from "react";
import { Tag, TagLabel, TagCloseButton, Input } from "@chakra-ui/react";

// I reworked this
//https://dev.to/prvnbist/create-a-tags-input-component-in-reactjs-ki
/**
 * Tagger component
 * @param {React Component Props} props passed down from upload.js; setTags and selectedTags which are used
 * to manage the state of which tags the user has chosen in the parent component.
 * @returns JSX for the Tagger component.
 */
export default function Tagger(props) {
  const makeRepeated = (arr, repeats) =>
    Array.from({ length: repeats }, () => arr).flat();
  const tagGradients = makeRepeated(
    [
      "linear(to-r, orange.400, yellow.400)",
      "linear(to-r, teal.400, blue.400)",
      "linear(to-r, pink.400, red.400)",
    ],
    3
  );
  const addTags = (event) => {
    if (
      event.key === "Enter" &&
      event.target.value !== "" &&
      props.selectedTags.length < 6
    ) {
      props.setTags([...props.selectedTags, event.target.value]);
      event.target.value = "";
    }
  };

  const removeTags = (index) => {
    props.setTags([
      ...props.selectedTags.filter(
        (tag) => props.selectedTags.indexOf(tag) !== index
      ),
    ]);
  };

  return (
    <>
      <Input
        type="text"
        id="upload-tagger"
        aria-label="image-tagger"
        onKeyUp={(event) => addTags(event)}
        placeholder="Press enter to add tags"
        _focus={{ boxShadow: "outline", color: "gray.800" }}
        _hover={{ color: "gray.800" }}
        width="20rem"
        bg={"gray.100"}
        border={0}
        color={"gray.800"}
        _placeholder={{
          color: "gray.800",
        }}
      />
      {props.selectedTags.length > 0 && (
        <div className="tag-container">
          {props.selectedTags.map((tag, index) => (
            <Tag
              size={"md"}
              key={`tag ${index}`}
              className="image-tag"
              bgGradient={tagGradients[index]}
            >
              <TagLabel key={`tag label ${index}`} color="gray.50">
                {tag.toLowerCase()}
              </TagLabel>
              <TagCloseButton
                key={`tag close button ${index}`}
                onClick={() => removeTags(index)}
              />
            </Tag>
          ))}
        </div>
      )}
    </>
  );
}
