import React from 'react';


export interface entryType {
  id: string;
  html: string;
}
export interface dbType {
  page1: entryType[];
  page2: entryType[];
}

export interface dbUpdateFnType {
  (newVal: entryType):void
}
export interface dbContextType {
  data: dbType,
  updateData: dbUpdateFnType,
}

export const getIdPosition: (id:string, dataArr:entryType[]) => number = (id, dataArr) => {
  let position:number =0;
  if (dataArr.length === 0) {
    console.log("getIdPosition: passed empty array");
    new Error ("getIdPosition passed empty array");
  } else {
    dataArr.forEach( (value,index)=> {

    })
  }
  
  return 4;
}
const emptyData: dbType = { page1: [], page2: [] };
const emptyEntry: entryType = { id: "", html:""}
export const EditContext = React.createContext(
  {
    data: emptyData,
    updateData: (emptyEntry:entryType):void => {},
  }
  );
EditContext.displayName = "Test data Context";

