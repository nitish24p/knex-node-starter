import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { createNewStore } from '../store/mainStore.js';
import stats from './../build/stats.json';
import routes from './../routes.js';
import { setWelcomeMessage } from './../actions/welcomeMessageAction.js';


let cssSrc = stats.main[1];
let jsSrc = stats.main[0];
let vendorSrc = stats.vendors;


export function renderHomePage(req) {

  const mainStore = createNewStore();
  mainStore.dispatch(setWelcomeMessage("Hey if you see this, you're ready to start hacking"));

  let app;
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      app = (
        <Provider store={mainStore} >
          <RouterContext {...renderProps} />
        </Provider>
      );
    }
  });

  let noIndexTag = '';
  if (process.env.NODE_ENV !== 'production') {
    noIndexTag = '<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">';
  }

  const appString = ReactDOMServer.renderToString(app);
  const initialState = mainStore.getState();


  return `
    <html lang="en-us">
      <head>
        <meta charset="utf-8">
        <title>Knex Starter </title>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"></link>
        <link rel="stylesheet" type="text/css" href="./../build/${cssSrc}"/>
        
      </head>
      <body>
        <div id="bodyOverlay"></div>
        <div id="mainContainer">
          <div>
            ${appString}
          </div>
        </div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script type="text/javascript" src="./../build/${vendorSrc}"></script>
        <script type="text/javascript" src="./../build/${jsSrc}"></script>
        
      </body>
    </html>
  `;
}