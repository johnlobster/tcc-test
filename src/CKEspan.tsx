import React from 'react';
import './CKEspan.css';
import * as db from "./database";
import "./globals";

declare var InlineEditor: any; // loaded from cdn as global

interface SpanIf {
  id: string;
  isFrame: boolean;
}

const CKEspan:React.FunctionComponent<SpanIf> = (props) => {

  let editorInstance:any = null;
  const [content, updateContent] = React.useState( appDb.getData("page1", props.id) );
  const [editing, updateEditing] = React.useState ( false);

  const exitCKEditor = (): void=> {
    console.log("Focus lost, so destroy editor");
    let outData: string = editorInstance.getData();
    console.log(`Output string: ${outData}`);
    // Could strip out <p> at this point, probably a good idea
    const removeP = /^\s*<p>(.*)<\/p>$/;
    const match: any = outData.match(removeP);
    if (match) {
      outData = match[1];
    }
    console.log(`Modified output string: ${outData}`);
    appDb.storeData( "page1", props.id, outData );
    updateContent(outData);
    updateEditing(false);

    editorInstance.destroy()
      .then(()=> {
        console.log("Editor destroyed");
      })
      .catch((err: any) => {
        console.error("Editor crashed during destruction");
        console.log(err);
    });
  }

  // straight inline version
  const handleClick = (event: React.MouseEvent): void => {
    if (! editing) {
      console.log(`Click event x=${event.clientX} y=${event.clientY}`);
      // console.log(event);
      InlineEditor
      .create(document.querySelector(`#${props.id}`))
      .then((ed: any) => {
        editorInstance = ed;
        console.log("Loaded editor, CKEspan");
        editorInstance.ui.focusTracker.on('change:isFocused', (evt:any, data:any, isFocused:boolean) => {
          console.log(`Editor focused: ${ isFocused }. `);
          // console.log(evt);
          // console.log(data);
          // console.log("----------");
        });
        // exit editor when focus lost
        editorInstance.ui.focusTracker.on('change:isFocused', (evt: any, data: any, isFocused: boolean) => {
          if (! isFocused) {
            exitCKEditor();
          }
        });
        // focus on content so that don't need two clicks
        editorInstance.editing.view.focus();
        // Disable return key - good for span editing, not so good for block editing
        // editorInstance.keystrokes.set('enter', ''); // didn't work ....
        // console.log(editorInstance);
        updateEditing(true);
      })
      .catch((err:any) => {
        console.error("Editor crashed");
        console.log(err);
      });
    } else {
      console.log("Bad if statement, should not have reached. Click should not have been caught if editing")
    }    
  }

  // dummy for typescript
  const nohandleClick = (event: React.MouseEvent): void => {}

  return (
    <div
      id={props.id}   
      className={editing? "editorSpan" : "editorSpan editorHover" } 
      onClick={(! editing) ? handleClick : nohandleClick }
    >
      {content} 
    </div>
  );
}

export default CKEspan;