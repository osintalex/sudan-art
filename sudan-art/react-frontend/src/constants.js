// Simple way to handle different production and development urls for the backend API

const prod = {
  url: "https://sudan-art.com",
};
const dev = {
  url: "http://localhost:8000",
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;
