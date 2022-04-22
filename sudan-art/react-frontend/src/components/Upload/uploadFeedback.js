import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import Emoji from "../Emoji/emoji.js";
import MultiLingualContent from "../MultingualContent/multilingualContent.js";

/**
 * React component for feedback after image upload
 * @param {props} props isOpen, onOpen, onClose are all passed down from upload.js and are part
 * of the Chakra modal component; the state is handled in upload.js. Similarly, errors and success also have
 * their state handled in upload.js and are passed down here.
 * @return {component} upload feedback component.
 */
function UploadFeedback(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={() => document.location.reload()}>
      <ModalOverlay />
      <ModalContent color="gray.800">
        {props.errors && (
          <ModalHeader>
            <MultiLingualContent contentID="upload_fail" />
          </ModalHeader>
        )}
        {props.success && (
          <ModalHeader>
            <MultiLingualContent contentID="upload_success" />
          </ModalHeader>
        )}
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
              We&apos;ve received your submission! Thank your for adding your
              work to the site.
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
            onClick={() => document.location.reload()}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

UploadFeedback.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired,
  ]),
  success: PropTypes.bool.isRequired,
};
export default UploadFeedback;
