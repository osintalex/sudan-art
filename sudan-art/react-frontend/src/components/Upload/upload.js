import React, { useState } from "react";
import NavBar from "../Navbar/navbar.js";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useDisclosure,
  SimpleGrid,
  Box,
  Container,
  Stack,
} from "@chakra-ui/react";
import Thumbnail from "./thumbnail.js";
import Tagger from "./tags.js";
import UploadFeedback from "./uploadFeedback.js";
import { config } from "../../constants.js"

export default function Upload() {
  const [fileValue, setFileValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [artist, setArtist] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSubmit(event) {
    setSubmitted(true);
    event.preventDefault();
    let data = new FormData();
    if (fileValue && artist && selectedTags.length > 0) {
      data.append("image", fileValue, fileValue.name);
      data.append("artist", artist);
      data.append("tags", selectedTags.toString());

      fetch(`${config.url}/upload/`, {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.status === 400) {
            return response.json();
          }
          if (response.ok) {
            setSuccess(true);
            onOpen(true);
          }
        })
        .then((apiResponse) => {
          if (apiResponse) {
            let apiErrorMessages = "";
            for (let [key, value] of Object.entries(apiResponse)) {
              let uppercaseKey = key.replace(/^\w/, (c) => c.toUpperCase());
              apiErrorMessages += `${uppercaseKey} field error: ${value} `;
            }
            // TODO add Arabic version? Turn error message into English and Arabic, split on a weird character
            // return version based off create context
            setErrors(apiErrorMessages);
            onOpen(true);
          }
        })
        .catch((error) => {
          console.error(error);
          onOpen(true);
          setErrors("Invalid form submission, please try again.");
        });
    } else {
      setErrors(
        "You must enter data into every field. Please resubmit the form."
      );
      onOpen(true);
    }
  }
  return (
    <>
      <NavBar />
      <br />
      <div className="upload-container">
        <Box position={"relative"}>
          <Container as={SimpleGrid} maxW={"7xl"}>
            <Stack
              bg={"gray.50"}
              rounded={"xl"}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              maxW={{ lg: "lg" }}
            >
              <Stack spacing={4}>
                <form
                  onSubmit={handleSubmit}
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                >
                  <FormControl id="file-upload">
                    <FormLabel className="search-form-label">
                      <Text
                        fontSize="2xl"
                        color="gray.800"
                        id="search-form-text"
                      >
                        Upload Art
                      </Text>
                    </FormLabel>
                    {submitted && (
                      <UploadFeedback
                        isOpen={isOpen}
                        onClose={onClose}
                        errors={errors}
                        fileValue={fileValue}
                        artist={artist}
                        selectedTags={selectedTags}
                        success={success}
                      />
                    )}
                    <label htmlFor="file-upload" className="fake-upload-button">
                      Browse
                    </label>
                    <Input
                      id="file-upload"
                      name="file"
                      type="file"
                      onChange={(event) => {
                        if (event.currentTarget.files[0].size > 10000000) {
                          setErrors(
                            "Sorry, your image is too large! The maximum size is 10MB."
                          );
                        }
                        setFileValue(event.currentTarget.files[0]);
                      }}
                      _focus={{ boxShadow: "outline", color: "gray.200" }}
                      _hover={{ color: "gray.200" }}
                    />
                    <Thumbnail file={fileValue} />
                    <FormLabel htmlFor="tags" id="search-form-label">
                      <Text
                        id="search-form-text"
                        fontSize="lg"
                        color="gray.800"
                      >
                        Tags
                      </Text>
                      <Text
                        id="search-form-text"
                        fontSize="sm"
                        color="gray.800"
                        as="i"
                      >
                        Add between 3 and 6 tags
                      </Text>
                    </FormLabel>
                    <Tagger
                      setTags={setSelectedTags}
                      selectedTags={selectedTags}
                    />
                    <FormLabel htmlFor="artist" id="search-form-label">
                      <Text
                        id="search-form-text"
                        fontSize="lg"
                        color="gray.800"
                      >
                        Artist
                      </Text>
                      <Text
                        id="search-form-text"
                        fontSize="sm"
                        color="gray.800"
                        as="i"
                      >
                        Write 'anonymous' if you want to be careful
                      </Text>
                    </FormLabel>
                    <Input
                      id="artist"
                      className="artist-input"
                      onChange={(event) => {
                        event.preventDefault();
                        setArtist(event.target.value);
                      }}
                      _focus={{ boxShadow: "outline", color: "gray.800" }}
                      _hover={{ color: "gray.800" }}
                      width="20rem"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.800"}
                      _placeholder={{
                        color: "gray.800",
                      }}
                    />
                    <br />
                    <Button
                      height="48px"
                      width="200px"
                      id="upload-submit-button"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </FormControl>
                </form>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </div>
    </>
  );
}
