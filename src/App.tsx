import React from 'react';
import './App.css';

function inIframe():boolean { try { return window.self !== window.top; } catch (e) { return true; } }

function App() {

  const [iFrame , updateIFrame] = React.useState( inIframe() ); // boolean

  const receiveMessage = (event:any) => {
    event.preventDefault(); // Probably doesn't bubble up
    console.log(`IFRAME postMessage received from ${event.origin}`);
    console.log(event.data); // might be an object so would be nice to pretty print
    
    // is console logging the source causing the issue ? Try sending a reply
    // console.log("IFRAME Reply to");
    // console.log(event.source);

    // reply
    event.source.postMessage(`A polite reply to ${event.data}`, "*");

  }

  // const sendMessage = () => {

  // }

  // on mount, listen to postMessage event
  React.useEffect(() => {
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
    })

  return (
    <div>
      <h1>The web app</h1>
      <h2>More stuff to make things happen</h2>
      { iFrame ? (
        <h1>Inside an Iframe</h1>
      ) : (
        <h1>Standalone</h1>

      )}
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
