import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import Emoji from "../Emoji/emoji.js";

/**
 * React component for feedback after image upload
 * @param {React Component Props} props isOpen, onOpen, onClose are all passed down from upload.js and are part
 * of the Chakra modal component; the state is handled in upload.js. Similarly, errors and success also have
 * their state handled in upload.js and are passed down here.
 * @returns 
 */
export default function UploadFeedback(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => {
        // I think this is the most elegant thing to do even if it's a bit annyoing; this just refreshes
        // the page so you have to start again after an attempt
        // I do the same for the second close button below
        document.location.reload();
        return props.onClose;
      }}
    >
      <ModalOverlay />
      <ModalContent color="gray.800">
        {props.errors && <ModalHeader>Invalid Submission</ModalHeader>}
        {props.success && <ModalHeader>Success!</ModalHeader>}
        <ModalCloseButton />
        {props.errors && (
          <ModalBody>
            <Text fontSize="md" color="red.400">
              {props.errors}
            </Text>
          </ModalBody>
        )}
        {props.success && (
          <ModalBody>
            <Text fontSize="md" color="gray.800">
              We've received your submission! Thank your for adding your work to
              the site.
              {["🥳", "🥳", "🥳"].map((x, index) => (
                <Emoji
                  symbol={x}
                  fontSize="20px"
                  id="upload-feedback-emoji"
                  key={`emoji ${index}`}
                />
              ))}
            </Text>
          </ModalBody>
        )}
        <ModalFooter>
          <Button
            id="upload-submit-button"
            onClick={() => {
              document.location.reload();
              return props.onClose;
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
