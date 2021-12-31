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

/**
 * Popover for users to click on images once the search results have returned - this way they can see artist
 * and upload date
 * @param {React Component Props} props popoverImageDetails is an object containing the image details, 
 * isOpen, onClose, onOpen are all passed down from the Chakra Modal component see - search.js
 * @returns a modal popover in JSX 
 */
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
