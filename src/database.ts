// abstract database implementation

// types
export type entryType = string;
export interface tableType {
  [entryName: string]: entryType;
}
export interface dbType {
  [tableName: string]: tableType;
}

export class DatabaseType {

  private theData: dbType;

  constructor(initData: dbType) {
    // check types
    this.theData = Object.assign({}, initData);

  }

  isDbTYpe = (test:dbType):boolean => {
    let matches:boolean = false;
    if (typeof(test) !== "object") {
      matches=false;
    }
    return matches;
  }

  static create = (initData : dbType) => {
    // check incoming data
    return (new DatabaseType(initData));
  }

  
  // load new data into the database
  load = (newData:dbType):void =>  {
    // could check for valid data
    this.theData = Object.assign({}, newData);
  }

  // get data from the database, returns object
  save = ():dbType => {
    return this.theData;
  }

  getData = (tableName: string, id: string): string => {
    // check for valid entry exists
    // return `${tableName} ${id}`;
    let data:string = ""
    try {
      data = this.theData[tableName][id];
    }
    catch {
      // unable to access the value
      throw new Error(`database: getData(${tableName},${id}) doesn't exist in database`);
    }
    finally {
      return data;
    }}
    

  storeData = (tableName: string, id: string, data:string): void => {
    // overwrites existing or creates new
    this.theData[tableName][id] = data;
  }
}
