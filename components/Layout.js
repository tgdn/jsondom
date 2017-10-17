import React from 'react';
import Head from 'next/head';
import { FocusStyleManager } from "@blueprintjs/core";
import Header from 'components/Header';

/* blueprint focus manager */
FocusStyleManager.onlyShowFocusOnTabs();

export default ({ children }) => (
  <div>
    <Head>
      <title>JSONDom</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/static/normalize.css" />
      <link rel="stylesheet" href="/static/blueprint-1.31.0.css" />
      <link rel="stylesheet" href="/static/semantic.css" />
    </Head>
    <Header />
    {children}
  </div>
)
