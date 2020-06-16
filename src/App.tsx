import React from 'react';
import './App.css';
import CKEspan from "./CKEspan";
import * as db from "./database";
import initialData from "./pageData.json";
import "./globals";

function inIframe():boolean { try { return window.self !== window.top; } catch (e) { return true; } }

// declare var InlineEditor: any;

console.log("Initial data");
console.log(initialData);

const tmpData: db.dbType = {
  page1: {
    "someId": "First editor data",
    "someOtherId": "Second editor data",

  }
}


function App() {
  // initialize database
  window.appDb = db.DatabaseType.create(tmpData);

  const [iFrame , updateIFrame] = React.useState( inIframe() ); // boolean
  
  const receiveMessage = (event:any):void => {
    event.preventDefault(); // Probably doesn't bubble up
    console.log(`IFRAME postMessage received from ${event.origin}`);
    console.log(event.data); // might be an object so would be nice to pretty print

    // reply
    event.source.postMessage(`A polite reply to ${event.data}`, "*");

  }

  const log = (event: React.MouseEvent): void => {
    event.stopPropagation();
    let dbase: db.dbType = appDb.save();
    console.log(dbase);
  }

  const write = (event: React.MouseEvent): void => {
    console.log("App: write");
  }

  // on mount, listen to postMessage event
  React.useEffect(() => {
    // console.log( window.IamAVariable);

    console.log("IFRAME Mount App");
    if ( iFrame) {
      console.log("IFRAME Inside iframe, listen for postMessage event");
      window.addEventListener("message", receiveMessage);
      return(() => {
        console.log("IFRAME Unmount App, remove message listener");
        window.removeEventListener("message", receiveMessage);
      });
    } else {
      return;
    }
  });

  
  return (
    <div>
      <h1>The web app</h1>
      <h2>More stuff to make things happen</h2>
      { iFrame ? (
        <h1>Inside an Iframe</h1>
      ) : (
        <h1>Standalone</h1>

      )}
      <p id="editMe">Initial content inside the react app</p>

      <button onClick={log}>Console log database</button>
      <button onClick={write}>Save to file</button>

      <p>Padding</p>
      
      
      <h3><CKEspan id="someId" isFrame={iFrame} /></h3>

      <h3><CKEspan id="someOtherId" isFrame={iFrame} /></h3>

      <h3>Want to get the iframe to scroll</h3>
      <h1>I want to scroll</h1>
      <h1>I want to scroll</h1>
      <h1>I want to scroll</h1>
      <h1>I want to scroll</h1>
      <h1>I want to scroll</h1>
      <h1>I want to scroll</h1>
      <h1>I want to scroll</h1>
      <h1>I want to scroll</h1>
      <h1>I want to scroll</h1>
      <h1>I want to scroll</h1>
      <h1>I want to scroll</h1>
      <h2>I should have scrolled by now</h2>
    </div>
  );
}

export default App;
