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

export default function UploadFeedback(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => {
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
