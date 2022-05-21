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
import { useNavigate } from "react-router-dom";

/**
 * React component for feedback after image upload
 * @param {props} props isOpen, onOpen, onClose are all passed down from upload.js and are part
 * of the Chakra modal component; the state is handled in upload.js. Similarly, errors and success also have
 * their state handled in upload.js and are passed down here.
 * @return {component} upload feedback component.
 */
function UploadFeedback(props) {
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => {
        props.setErrors("");
        props.onClose();
      }}
    >
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
        {props.success ? (
          <ModalCloseButton onClick={() => navigate("/browse")} />
        ) : (
          <ModalCloseButton />
        )}
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
              <MultiLingualContent contentID="upload_success_message" />
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
          {props.success ? (
            <Button
              id="upload-submit-button"
              onClick={() => {
                props.setErrors("");
                props.onClose();
                navigate("/browse");
              }}
            >
              Close
            </Button>
          ) : (
            <Button
              id="upload-submit-button"
              onClick={() => {
                props.setErrors("");
                props.onClose();
              }}
            >
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

UploadFeedback.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired,
  ]),
  success: PropTypes.bool.isRequired,
};
export default UploadFeedback;
