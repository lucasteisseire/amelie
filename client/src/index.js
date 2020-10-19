import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "apollo-link-http";
import { store } from "./store";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});
const authLink = setContext((_, { headers, ...context }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloApp = () => (
  <Provider store={store}>
    <ApolloProvider store={store} client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);
ReactDOM.render(<ApolloApp />, document.getElementById("root"));
