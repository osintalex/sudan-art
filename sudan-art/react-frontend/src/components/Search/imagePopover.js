import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

export default function ImagePopover(props) {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent color="gray.50">
          <ModalHeader className="search-modal-header">{props.artist}</ModalHeader>
          <ModalBody className="search-modal-body">
            <Text fontSize="md" color="gray.50" as="i">
              {props.date}
            </Text>
            <Image
              className="search-popover-image"
              alt={props.popoverImageDetails.alt_description}
              src={props.popoverImageDetails.src}
              onClick={props.onOpen}
            />
          </ModalBody>

          <ModalFooter className="search-modal-footer">
            <Button id="upload-submit-button" onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
