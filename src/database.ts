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
  // All the data in the database
  private theData: dbType;

  constructor(initData: dbType) {
    // check types
    this.theData = Object.assign({}, initData);

  }

  // The data can acquired from an API in JSON format, so need to check
  // for a valid database before creating, even using typescript
  isDbType = (testMe:dbType):boolean => {
    let matches:boolean = true;
    if (typeof(testMe) !== "object") {
      matches=false;
    } else {
      for( const key of Object.keys(testMe)) {
        // careful to distinguish between an array and object
        if( (typeof(testMe[key])!== "object") || (testMe[key].length) ){
          matches=false;
        } else  {
          for( const subKey of Object.keys(testMe[key])) {
            if (typeof (testMe[key][subKey]) !== "string") {
              matches = false;
            }
          }
        }
      }
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
