import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";

import CONST from "../utils/constants";

const httpLink = new HttpLink({
  uri: CONST.BASE_URL_GRAPHQL_API,
  headers: {
    "x-hasura-admin-secret": CONST.API_KEY,
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: CONST.BASE_URL_GRAPHQL_WS,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": CONST.API_KEY,
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
