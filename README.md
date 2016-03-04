# My Snippets

## Description

Provide web&desktop apps to save my little snippets while coding.

![screenshot](https://raw.githubusercontent.com/MrHuxu/img-repo/master/my-snippets/my%20snippet.png)

## Dependencies

Sincerely thanks for these frameworks or libraries.

1. [React](https://github.com/facebook/react), build component system of this project to make development comfortable.
2. [Redux](https://github.com/reactjs/redux), state machine and data stream controller of this app.
3. [Electron](https://github.com/atom/electron), build cross platform desktop app.
4. [NeDB](https://github.com/louischatriot/nedb), based on Chrome IndexedDB, for data persistance.
5. [Material-UI](https://github.com/callemall/material-ui) & [React-Flexbox-Grid](https://github.com/roylee0704/react-flexbox-grid), the frontend UI library.
6. [CodeMirror](https://github.com/codemirror/CodeMirror), awesome & easily integrated code editor written in pure JavaScript.
7. [Webpack](https://github.com/webpack/webpack), compile and compress js & css & other assets.
8. [NodeJS](https://github.com/nodejs/node), the basic of this project.

## Usage

At first, clone this project and install all the dependencies.
    
    git clone git@github.com:MrHuxu/MySnippets.git
    cd MySnippets
    npm install

1. In Browser

    Use gulp to start server and open ```http://localhost:15106``` in browser.

        npm run dev

2. Independent App (*Currently just for OS X*)

     Install Electron and make sure the ```Electron.app``` exists in ```/Applications```.

    Use gulp to compile asset files and run Electron app.

        npm run prd-ele

## To Do

- [x] export/import .json file
- [ ] cloud sync through GitHub
