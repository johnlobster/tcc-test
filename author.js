
const postTest = () => {
  // don't use "*" in production
  console.log("Author: Send first message to iframe");
  iframeElement.contentWindow.postMessage("Ping", "*")
}

const saveData = () => {
  console.log("Author: Send save request to web page");
  iframeElement.contentWindow.postMessage("Save", "*")
}

const receiveMessage = (event) => {
  event.preventDefault(); // Probably doesn't bubble up
  console.log(`Author: Message received from ${event.origin}`);
  console.log(event.data);
  // send to server by api
  if (event.data === "Pong") {
    console.log("Author: replied to Ping");
    return; // from postMessage
  } else {
    const dataObj = JSON.parse(event.data);
    console.log(`Author received ${dataObj}`);
    window.axios.post("http://localhost:3000/write", dataObj)
    .then((response) => {
      if (response.status === 200) {
        // server received data
        console.log("author.js server data transfer confirmed");
      } else {
        console.log(`author.js data transfer failed. http returned ${response.status}`);

      }})
      .catch((error) => {
        if (error.response) { 
          console.log(`author.js http returned error code ${error.response.status}`);
        } else {
          // The request was made but no response was received 
          console.log(`author.js http request timed out`);
        }
      });
  }
}

let iframeElement; 

window.onload = () => {
      console.log("Author: document loaded");
      window.addEventListener("message", receiveMessage);
      // insert iframe, could be done with environment variable
  const div = document.getElementById("iframeContainer");
       
      if (div) {
        const el = document.createElement("IFRAME");
        // el.setAttribute("src", "http://localhost:5000")
        el.setAttribute("src", "file:///build.html")

        el.setAttribute("id", "iframeId")
        el.setAttribute("name", "userIframe")
        // div.appendChild(el)
        
      }
      else {
        console.log("Author: Failed to create iframe element")
      }
  iframeElement = document.getElementById("iframeId")
      if (!iframeElement) {
        console.log("Author: Failed to find iframe element");
      } else {
        console.log("Author: found iframe element");
      }

      // postTest(iframeElement);
    }