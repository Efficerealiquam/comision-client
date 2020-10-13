import React from "react";
import ApolloClient from "apollo-client";
import App from "./App";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

const httpLinK = createHttpLink({
  uri: "http://localhost:3500",
});

const client = new ApolloClient({
  link: httpLinK,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
