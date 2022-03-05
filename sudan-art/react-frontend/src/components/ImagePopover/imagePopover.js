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
    ],
    3
  );
  const { imageDescription, imageArtist, imageDate, imageHighRes } =
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
            <Center>
              {imageDescription.split(",").map((tag, index) => (
                <Tag
                  size={"md"}
                  key={`tag ${index}`}
                  className="image-tag"
                  bgGradient={tagGradients[index]}
                >
                  <TagLabel key={`tag label ${index}`} color="gray.50">
                    {tag.toLowerCase()}
                  </TagLabel>
                </Tag>
              ))}
            </Center>

            <Text fontSize="sm" color="gray.50" as="abbr" align="center">
              {imageDate}
            </Text>
            <br />

            <Text fontSize="sm" color="gray.50" as="i" align="center">
              {"Images are shared on this website for the sole purpose of supporting the Sudanese revolutionary" +
                " movement. Do not share or otherwise reproduce for profit."}
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
                realted={["twitter_account_one", "twitter_account_two"]}
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
              <a href={imageHighRes}>Full Resolution</a>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
ImagePopover.propTypes = {
  popoverImageDetails: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
};
export default ImagePopover;
