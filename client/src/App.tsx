import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import React from "react";
import { useRoutes } from "react-router-dom";
import GlobalContextProvider from "./context/GlobalContext";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import routes from "./routes";

const httpLink = new HttpLink({
  // uri: "http://devserver.tanosugi.com:80/graphql/",
  uri: "http://18.183.158.39:8000/graphql/", // デプロイ用
  // uri: "http://127.0.0.1:8000/graphql/",  // 開発用
  // uri: "http://http://18.183.158.39:8000//graphql/",
  fetchOptions: { mode: "cors" },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const errorAndHttplink = ApolloLink.from([
  errorLink,
  authLink,
  httpLink as any,
]);

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: errorAndHttplink as any,
  cache: new InMemoryCache(),
});

const App = () => {
  // const routing = useRoutes(routes);

  const routing = useRoutes(routes());

  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <GlobalContextProvider>{routing}</GlobalContextProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export default App;
