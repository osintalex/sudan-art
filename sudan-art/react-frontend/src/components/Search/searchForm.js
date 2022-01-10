import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";

/**
 * React search form component.
 * @param {React Component Props} props setPics passed down from search.js and handlesubmit also passed down from
 * search.js parent component
 * @returns JSX for the search form!
 */
export default function SearchForm(props) {
  return (
    <Formik
      initialValues={{
        search: "",
        artist: "",
        dateFrom: "",
        dateTo: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.search) {
          errors.search = "Please enter a search term";
        } else if (
          !/^[\u0621-\u064A\u0660-\u0669 a-zA-Z0-9]{3,30}$/i.test(values.search)
        ) {
          errors.search =
            "Invalid search terms. Only Arabic, English, and numbers allowed. You must use at least three" +
            "characters.";
        }
        if (
          values.artist &&
          !/^[\u0621-\u064A\u0660-\u0669 a-zA-Z0-9]{1,30}$/i.test(values.artist)
        ) {
          errors.artist =
            "Invalid artist term. Only Arabic, English, and numbers allowed.";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.setPics([]);
        props.handleSubmit({
          query: values.search,
          artist: values.artist,
          dateFrom: values.dateFrom,
          dateTo: values.dateTo,
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="search" name="search">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.search && form.touched.search}
                id="image-description"
              >
                <FormLabel htmlFor="search terms" id="search-form-label">
                  <Text id="search-form-text" fontSize="lg" color="gray.800">
                    Search terms
                  </Text>
                </FormLabel>
                <Input
                  {...field}
                  id="search"
                  className="search-input"
                  _focus={{ boxShadow: "outline", color: "gray.800" }}
                  _hover={{ color: "gray.700" }}
                  width="20rem"
                  color="gray.700"
                  aria-label="search terms input"
                  type="text"
                />
                <FormErrorMessage>{form.errors.search}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field type="artist" name="artist">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.artist && form.touched.artist}
                id="image-artist"
              >
                <FormLabel htmlFor="artist" id="search-form-label">
                  <Text id="search-form-text" fontSize="lg" color="gray.800">
                    Artist
                  </Text>
                </FormLabel>
                <Input
                  {...field}
                  id="artist"
                  className="search-input"
                  _focus={{ boxShadow: "outline", color: "gray.700" }}
                  _hover={{ color: "gray.700" }}
                  width="20rem"
                  color="gray.700"
                />
                <FormErrorMessage>{form.errors.artist}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field type="dateFrom" name="dateFrom">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.dateFrom && form.touched.dateFrom}
                id="image-dateFrom"
              >
                <FormLabel htmlFor="dateFrom" id="search-form-label">
                  <Text id="search-form-text" fontSize="lg" color="gray.800">
                    Date from
                  </Text>
                </FormLabel>
                <Input
                  {...field}
                  id="search-date"
                  _focus={{ boxShadow: "outline", color: "gray.700" }}
                  _hover={{ color: "gray.700" }}
                  width="20rem"
                  type="date"
                  color="gray.700"
                />
                <FormErrorMessage>{form.errors.dateFrom}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field type="dateTo" name="dateTo">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.dateTo && form.touched.dateTo}
                id="image-dateTo"
              >
                <FormLabel htmlFor="dateTo" id="search-form-label">
                  <Text id="search-form-text" fontSize="lg" color="gray.800">
                    Date to
                  </Text>
                </FormLabel>
                <Input
                  {...field}
                  id="search-date"
                  _focus={{ boxShadow: "outline", color: "gray.700" }}
                  _hover={{ color: "gray.700" }}
                  width="20rem"
                  type="date"
                  color="gray.700"
                />
                <FormErrorMessage>{form.errors.dateTo}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            height="48px"
            width="200px"
            type="submit"
            id="search-button"
            disabled={isSubmitting}
            aria-label="search button"
          >
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
}
