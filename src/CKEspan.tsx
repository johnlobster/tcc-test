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

  // straight inline version
  const handleClick = (event: React.MouseEvent): void => {
    if (! editing) {
      InlineEditor
      .create(document.querySelector(`#${props.id}`))
      .then((ed: any) => {
        editorInstance = ed;
        console.log("Loaded editor");
        console.log(editorInstance);
        updateEditing(true);
      })
      .catch((err:any) => {
        console.error("Editor crashed");
        console.log(err);
      });
    } else {
      updateEditing(false);
      console.log("removing editor instance")
      editorInstance.destroy();
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