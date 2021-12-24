import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

export default function ImagePopover(props) {
  const { imageSrc, imageDescription, imageArtist, imageDate } =
    props.popoverImageDetails;
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent color="gray.50">
          <ModalHeader className="search-modal-header">
            {imageArtist}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="search-modal-body">
            <Image
              className="search-popover-image"
              alt={imageDescription}
              src={imageSrc}
              onClick={props.onOpen}
            />
            <Text fontSize="md" color="gray.50" as="i" align="center">
              {imageDate}
            </Text>
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
