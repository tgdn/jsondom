import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { FocusStyleManager } from "@blueprintjs/core";
import Main from 'components/Main';
import Header from 'components/Header';
import StatusBar from 'components/StatusBar';

/* blueprint focus manager */
FocusStyleManager.onlyShowFocusOnTabs();

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden !important;
`;

const Layout = ({ children }) => (
  <Main>
    <Head>
      <title>JSONDom</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/static/normalize.css" />
      <link rel="stylesheet" href="/static/blueprint-1.31.0.css" />
      <link rel="stylesheet" href="/static/semantic.css" />
      <link rel="stylesheet" href="/static/style.css" />
    </Head>
    <Container>
      {children}
    </Container>
    <StatusBar />
  </Main>
);

export default Layout;
