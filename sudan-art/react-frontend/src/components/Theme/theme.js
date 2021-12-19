import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "varta",
    body: "varta",
  },
  styles: {
    global: {
      'html, body': {
        background: "linear-gradient(90deg, #22648f, #276a94, #2b719a, #30779f, #367da3, #3b83a8, #4189ac, #488faf, #4f95b2, #5999b2, #639cb2, #6da0b2)",
        color: "gray.50",
      },
    },
  },
});

export default theme;
