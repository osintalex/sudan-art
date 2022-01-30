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
  Tag,
  TagLabel,
  Center,
} from "@chakra-ui/react";
import { makeRepeated } from "../../utils/utils";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
/**
 * Popover for users to click on images once the search results have returned - this way they can see artist
 * and upload date
 * @param {React Component Props} props popoverImageDetails is an object containing the image details,
 * isOpen, onClose, onOpen are all passed down from the Chakra Modal component see - search.js
 * @returns a modal popover in JSX
 */
export default function ImagePopover(props) {
  const tagGradients = makeRepeated(
    [
      "linear(to-r, orange.400, yellow.400)",
      "linear(to-r, teal.400, blue.400)",
      "linear(to-r, pink.400, red.400)",
    ],
    3
  );
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
            <Center style={{ scale: "0.5" }}>
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
            <Button id="upload-submit-button" onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
