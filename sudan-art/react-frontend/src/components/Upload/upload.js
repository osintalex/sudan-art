import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import Tagger from "./tags.js";
import Thumbnail from "./thumbnail.js";
import UploadFeedback from "./uploadFeedback.js";
import { config } from "../../constants.js";
import NavBar from "../Navbar/navbar.js";
import MultiLingualContent from "../MultingualContent/multilingualContent.js";
import { LanguageContext } from "../../multilingualContext/context.js";

/**
 * Main upload component. There are a few fiddly things going on here:
 * 1. I wrote my own form component since most libraries or other defaults don't like file uploads
 * 2. For ease I handled all the validation in the backend, so after submission the file goes to the
 * backend API and then you get the error message back. It's just way easier to do this in python than
 * try to handle client side image validation that isn't secure anyway so would just be duplicated. The
 * idea of the thumbnail part is to improve user experience so they can see the image is uploaded anyhow prior
 * to submission.
 * 3. I used a label to sit on top of a file upload input button. This is because the latter is impossible to
 * style, so I've just hidden it with CSS.
 * @return {component} Upload component
 */
export default function Upload() {
  const [fileValue, setFileValue] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { language } = useContext(LanguageContext);

  /**
   * Handle submit function
   * @param {object} event from the form entry.
   */
  function handleSubmit(event) {
    setSubmitted(true);
    event.preventDefault();
    const data = new FormData();
    if (fileValue && artist && selectedTags.length > 0) {
      data.append("image", fileValue, fileValue.name);
      data.append("artist", artist);
      data.append("url", url);
      data.append("tags", selectedTags.toString());
      data.append("target_language", language === "english" ? "ar" : "en");
      fetch(`${config.url}/upload/`, {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.status === 400) {
            return response.json();
          }
          if (response.status === 201) {
            setSuccess(true);
            onOpen(true);
          }
        })
        .then((apiResponse) => {
          if (apiResponse) {
            let apiErrorMessages = "";
            for (const [key, value] of Object.entries(apiResponse)) {
              const uppercaseKey = key.replace(/^\w/, (x) => x.toUpperCase());
              apiErrorMessages += `${uppercaseKey} field error: ${value} `;
            }
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
      setErrors(<MultiLingualContent contentID="upload_errors_1" />);
      onOpen(true);
    }
  }
  return (
    <>
      <NavBar />
      <br />
      <div className="upload-container">
        <Box position="relative">
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
                        {<MultiLingualContent contentID="upload_title" />}
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
                        setErrors={setErrors}
                      />
                    )}
                    {/* Here is the label I'm using to sit on top of the file upload id component since I can't
                    really style it otherwise */}
                    <label htmlFor="file-upload" className="fake-upload-button">
                      {<MultiLingualContent contentID="upload_browse_button" />}
                    </label>
                    <Input
                      id="file-upload"
                      name="file"
                      type="file"
                      aria-label="image-upload"
                      onChange={(event) => {
                        if (event.currentTarget.files[0].size > 10000000) {
                          setErrors(
                            <MultiLingualContent contentID="upload_bad_image" />
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
                        {<MultiLingualContent contentID="upload_tags" />}
                      </Text>
                      <Text
                        style={{ textAlign: "center", display: "grid" }}
                        fontSize="sm"
                        color="gray.800"
                        as="i"
                      >
                        {
                          <MultiLingualContent contentID="upload_tags_instructions" />
                        }
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
                        {<MultiLingualContent contentID="upload_artist" />}
                      </Text>
                      <Text
                        style={{ textAlign: "center", display: "grid" }}
                        fontSize="sm"
                        color="gray.800"
                        as="i"
                      >
                        {
                          <MultiLingualContent contentID="upload_artist_instructions" />
                        }
                      </Text>
                    </FormLabel>
                    <Input
                      id="artist"
                      aria-label="artist-name-input"
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
                    <FormLabel htmlFor="url" id="search-form-label">
                      <Text
                        id="search-form-text"
                        fontSize="lg"
                        color="gray.800"
                      >
                        {<MultiLingualContent contentID="upload_url" />}
                      </Text>
                      <Text
                        style={{ textAlign: "center", display: "grid" }}
                        fontSize="sm"
                        color="gray.800"
                        as="i"
                      >
                        {
                          <MultiLingualContent contentID="upload_url_instructions" />
                        }
                      </Text>
                    </FormLabel>
                    <Input
                      id="url"
                      aria-label="url-input"
                      className="url-input"
                      onChange={(event) => {
                        event.preventDefault();
                        setUrl(event.target.value);
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
                      aria-label="upload-form-submission"
                      height="48px"
                      width="200px"
                      id="upload-submit-button"
                      type="submit"
                    >
                      {<MultiLingualContent contentID="upload_submit" />}
                    </Button>
                    {!success && submitted && !errors ? (
                      <div style={{ marginTop: "1rem" }}>
                        <Text
                          id="search-form-text"
                          fontSize="sm"
                          color="gray.800"
                          as="i"
                        >
                          Uploading, please wait for validation...
                        </Text>
                      </div>
                    ) : null}
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
