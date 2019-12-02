import React from 'react';
import styled from 'styled-components';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import Wrapper from './Wrapper';


interface Definintion {
  kind: string;
  operation?: string;
};
const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/graphql',
  options: {
    reconnect: true
  },
});
const link = split(
  ({ query }) => {
    const { kind, operation }: Definintion = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

// Create an http link:


const Layout = styled.div`
  display: block;
  width: 100%;
  max-width: 500px;
  margin: 100px auto 0;
  justify-content: space-center;
`


const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Layout>
          <Wrapper />
        </Layout>
      </ApolloHooksProvider>
    </ApolloProvider>

  );
}

export default App;
