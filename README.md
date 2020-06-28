# Table of Contents
- [What is this?](#what-is-this-)
- [Front End](#front-end)
  * [Components](#components)
    + [Atomic Structure](#atomic-structure)
      - [Atoms](#atoms)
      - [Molecules](#molecules)
      - [Organisms](#organisms)
  * [Scripts](#scripts)
    + [`npm start`](#-npm-start-)
    + [`npm run build`](#-npm-run-build-)
- [Back-End](#back-end)
  * [Scripts](#scripts-1)
    + [`npm start`](#-npm-start--1)
    + [`npm run debug`](#-npm-run-debug-)
  * [Logging/debugging](#logging-debugging)

# What is this?
Front-end application built in React, tied to an already built nodejs back-end with both api and websocket endpoints.  

`The back-end:` League of football teams which - through its websocket endpoint - sends random match results. 

`The front-end`: An application that displays those incoming match results in a tabular format, sorted by the team with the most points.

# Front End 

Built in React and Typescript and a Redux store for statement management.

## Components

### Atomic Structure
Uses the Atomic directory structure.

#### Atoms 
The current atom is a very versatile Sheet component which is injected multiple props via the [`styled-system`](https://www.npmjs.com/package/styled-system) package.

#### Molecules
The current molecule used is the container for our table called `DataTableContainer` and is created through the Sheet component.

#### Organisms
The DataTable is built off of [`@material-ui/core`](material-ui.com/)'s `Table` components, and is the main table component for this app.

## Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Back-End

Built by Nino Miletich (<nino@mollybet.com>)

## Scripts

### `npm start`

Runs the server in "silent" mode, meaning no logs (see logging/debugging section for more info)

### `npm run debug`

Runs the server with basic logging.

## Logging/debugging

The server uses the [`debug`](https://www.npmjs.com/package/debug) packages, so if you want more output,
you can adjust the `DEBUG` environment variable.