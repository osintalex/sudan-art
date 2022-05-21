import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  Text,
  Link,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { makeRepeated } from "../../utils/utils";
import { config } from "../../constants.js";
import MultiLingualContent from "../MultingualContent/multilingualContent.js";

/**
 * Popover for users to click on images once the search results have returned - this way they can see artist
 * and upload date
 * @param {props} props contains the image details. In addition,  isOpen, onClose, onOpen
 * are all passed down from the Chakra Modal component see - search.js
 * @return {component} a modal popover component
 */
function ImagePopover(props) {
  const tagGradients = makeRepeated(
    [
      "linear(to-r, orange.400, yellow.400)",
      "linear(to-r, teal.400, blue.400)",
      "linear(to-r, pink.400, red.400)",
      "linear(to-r, green.200, pink.500)",
    ],
    5
  );
  const { imageDescription, imageArtist, imageDate, imageHighRes, sourceURL } =
    props.popoverImageDetails;

  const imageSrc =
    process.env.NODE_ENV === "development"
      ? `${config.url}${props.popoverImageDetails.imageSrc}`
      : props.popoverImageDetails.imageSrc;

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
            {imageDescription.split(",").map((tag, index) => (
              <Tag
                size={"lg"}
                key={`tag ${index}`}
                className="image-tag"
                bgGradient={tagGradients[index]}
              >
                <TagLabel key={`tag label ${index}`} color="gray.50">
                  {tag.toLowerCase()}
                </TagLabel>
              </Tag>
            ))}
            <br />
            <Text fontSize="sm" color="gray.50" as="abbr" align="center">
              {imageDate}
            </Text>
            <br />
            <Link fontSize="sm" color="gray.50" as="abbr" align="center">
              {sourceURL}
            </Link>
            <br />
            <Text fontSize="sm" color="gray.50" as="i" align="center">
              <MultiLingualContent contentID="image_popover" />
            </Text>
            <Center style={{ transform: "scale(0.6)" }}>
              <FacebookShareButton
                url={imageSrc}
                quote={
                  "Look at this amazing piece of Sudanese revolutionary art! Burhan fi kobr!"
                }
                hashtag={"#sudancoup"}
              >
                <FacebookIcon />
              </FacebookShareButton>
              <TwitterShareButton
                url={imageSrc}
                title={"Sudanese Revolutionary Art"}
                via={"https://sudanart.com"}
                hashtags={["#sudancoup", "#sudanart"]}
                related={["twitter_account_one", "twitter_account_two"]}
              >
                <TwitterIcon />
              </TwitterShareButton>
              <WhatsappShareButton
                url={imageSrc}
                title={"Sudanese Revolutionary Art"}
              >
                <WhatsappIcon />
              </WhatsappShareButton>
            </Center>
          </ModalBody>

          <ModalFooter className="search-modal-footer">
            <Button id="upload-submit-button" size="sm">
              <a href={imageHighRes}>
                <MultiLingualContent contentID="full_resolution" />
              </a>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
ImagePopover.propTypes = {
  popoverImageDetails: PropTypes.object,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default ImagePopover;
