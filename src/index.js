import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import './styles/index.css';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";

const httpLink = createHttpLink({ uri: "http://localhost:4000" })

const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() })


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)