import React from 'react';
import './CKEspan.css';

declare var InlineEditor: any; // loaded from cdn
// declare var editorInstance: any; 

interface SpanIf {
  id: string;
  isFrame: boolean;
}

interface dType {
  id: string;
  html: string;
}
let testData:dType[] = [
  { id:"someId",html:"Time to say Hello"},
  { id:"someOtherId", html:"Oh no,not again"}
];


const CKEspan:React.FunctionComponent<SpanIf> = (props) => {

  let editorInstance:any = null;
  const [content, updateContent] = React.useState( testData[0].html );
  const [editing, updateEditing] = React.useState ( false);

  //React.useEffect(()=> {
    // InlineEditor
    //   .create(document.querySelector(`#${props.id}`))
    //   .then((ed: any) => {
    //     editorInstance = ed;
    //     console.log("Loaded editor");
    //   })
    //   .catch((err:any) => {
    //     console.error("Editor crashed");
    //     console.log(err);
    //   });
    // return( () => {
    //   console.log("removing editor instance")
    //   editorInstance.destroy();
    // })
  //})

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

    updateContent(outData);
    testData[0].html = outData;
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
      console.log(event);
      InlineEditor
      .create(document.querySelector(`#${props.id}`))
      .then((ed: any) => {
        editorInstance = ed;
        console.log("Loaded editor, CKEspan");
        editorInstance.ui.focusTracker.on('change:isFocused', (evt:any, data:any, isFocused:boolean) => {
          console.log(`Editor focused: ${ isFocused }. `);
          console.log(evt);
          console.log(data);
          console.log("----------");
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

  // decoupled version
  // const handleClick = (event: React.MouseEvent): void => {
  //   if (!editing) {
  //     InlineEditor
  //       .create(`${content}`)
  //       .then((ed: any) => {
  //         editorInstance = ed;
  //         console.log("Loaded editor");
  //         console.log(editorInstance);
  //         const el = document.getElementById(props.id);
  //         if (el) {
  //           el.appendChild(editorInstance.ui.element);
  //         } else {
  //           new Error(`created detached inline editor, but couldn't find where to attach it (id = ${props.id})`);
  //         }
  //         updateEditing(true);

  //       })
  //       .catch((err: any) => {
  //         console.error("Editor crashed");
  //         console.log(err);
  //       });
  //   } else {
  //     updateEditing(false);
  //     console.log("removing editor instance")
  //     editorInstance.destroy();
  //   }
  // }

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