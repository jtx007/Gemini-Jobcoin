# Gemini-Jobcoin

This is my jobcoin submission for the Gemini take home assignment for the Frontend Engineer Position. 

#### Sample jobcoin address logins for my api instance **jtx007, mark, brandon, and james**

## Prerequisites

- **nvm**: use [nvm](https://github.com/nvm-sh/nvm) and run `nvm install` and nvm will read the .npmrc file to install the compatible node version for this project - Node version 14.17.0

- **yarn**: install [yarn](https://yarnpkg.com/) globally. Its a great package and project manager and the following steps will utilize `yarn` in the examples.

## Tech Stack

- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/docs/getting-started)
- [framer-motion](https://www.framer.com/docs/)
- [Recharts](https://recharts.org/en-US)


## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with a template flag for chakra ui. This template sets up a new react app with Create React App and all its glory with all of the configurations to have Chakra-UI in the project. To learn more about the Create React App template with Chakra UI, check out the docs [here](https://chakra-ui.com/guides/integrations/with-cra).

To develop on the project you have the following available scripts: `start`, `build`, `test`, `eject`. (See docs as part of the [react-scripts](https://create-react-app.dev/docs/available-scripts/) for more info):

For the purposes of a demo, you won't need most of the scripts. You can run:

```
$ yarn && yarn start
```

For tests run:

```
$ yarn test
```

This will spin up a development server at https://localhost:3000

## Technical Design

For the frontend, I decided to go with Chakra UI, a component library that emphasizes simplicity, modularity, and accessibility. Think Tailwind CSS but with built out components that are fully customizeable. These prebuilt components provide great building blocks for your application. You can use them straight out of the box or build your own using said building blocks for even further extensibility. The documentation is great and seemed like a no brainer. I used the latest version of React with the latest features, such as Hooks. I used the following third-party libraries on top of Chakra UI:

- [@reach/router](https://reach.tech/router/)
  - a small, simple router for React that borrows from React Router, Ember, and Preact Router. Used for navigation in React SPA's.
- [axios](https://axios-http.com/docs/intro)
  - a promise-based HTTP Client for node.js and the browser. Used in lieu of the native fetch api found in the browser.
- [framer-motion](https://www.framer.com/docs/)
  - A production-ready motion library for React. It came bundled with the Chakra UI template and composes it's animations.
- [Recharts](https://recharts.org/en-US)
  - A composable charting library built on React components. Used a line chart to display user's transaction data over time.

## Project Walkthrough

Made with the [Create React App template](https://chakra-ui.com/guides/integrations/with-cra) with Chakra UI, this project is fairly standard in terms of design. The project was built in reference to some design screenshots via Dropbox.

- Start off at `public/index.html`. This gets served with all the bundled JS when this app is deployed. From there, the JS initializes React which renders DOM into the <div#root>.
- The Javascript begins at [`index.js`](src/index.js). There you will find where React is bootstrapped and rendered into the DOM mentioned above. The difference here compared to other CRA's is the ColorModeScript from Chakra UI, which helps keep color theming settings in sync across pages of the App.
- [`App.js`](src/components/App.js) is the starting point of the React component heirarchy.
- For this app, I have a Chakra Provider that wraps my entire application, with a theme prop, which is extending the default [theme](src/theme.js) from Chakra UI with some custom styles of my own. I then have a [Layout](src/components/Layout.js) component which encompasses the [Navbar](src/components/Navbar.js) wrapping the application.
- Then I have the Router provider from reach/router wrapping the page components for the application with routes for the [Login](src/pages/Login.js) and [Profile](src/pages/Profile.js).
- There's a faux login via jobcoin address using React Context via [auth](src/context/auth.js) file. The Login pages makes a request to the jobcoin api via axios and stores the user balance and their transactions.
- Then that data is fetched again along with all transaction data occurred in the api instance, to be displayed on the [Profile](src/pages/Profile.js) in specific [ProfileSection](src/components/ProfileSection.js) components with the user balance and the [SenderForm](src/components/SenderForm.js) component to send jobcoins to other addresses.
- The user's jobcoin balance is displayed, a form to send jobcoins to another jobcoin address via the [SenderForm](src/components/SenderForm.js) component, as well as a Transaction Log displayed with the [TransactionLogItem](src/components/TransactionLogItem.js) item in the [TransactionLog](src/components/TransactionLog.js) component, which updates as jobcoins are sent to other other jobcoin addresses.
- Lastly we have a line chart displayed via the [TransactionChart](src/components/TransactionChart.js) component, which displays the user's transactions over time and renders dynamically as jobcoins are sent to other addresses. There is also a custom tooltip to provide more specific transaction related data.

## Stretch Features

- More in depth unit tests.
- Responsiveness could be better, had some issues making the Recharts line chart component(s) responsive.


