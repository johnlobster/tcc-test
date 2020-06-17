import {DatabaseType, dbType} from "../src/database";
import { expect } from 'chai';
// import mocha from "mocha";


const emptyDB: dbType = {};
const dbTest1: dbType = {
  page1: { 
    item1: "Hello",
    sillyItem: "Monty Python" 
  },
  page2: {
    item1: "Goodbye",
    item2: "Fetched item 2",
    item3: "Fetched item 3"
  }
}
// console.log("dbTest1")
// console.log(dbTest1.page1.item1)
// console.log(dbTest1["page1"]["item1"])
// console.log(dbTest1.page2.item1)
// console.log("End dbTest1")

describe("Check isDbType()", function () {
  // dummy so can test
  let db = DatabaseType.create(emptyDB);

  it("Checks valid and empty", function (done) {
    let y: boolean = db.isDbType(dbTest1);
    expect(y).to.equal(true)
    // empty table is valid
    y = db.isDbType({ fred: {}})
    let x:boolean = db.isDbType(emptyDB);
    expect(x).to.equal(true)
    done()
  })


  // Hard to check bad inputs types with typescript. Created a variable with type any
  
  it("Checks strings, numbers, booleans", function(done) {
    let x:any = "Hello";
    expect(db.isDbType(x)).to.equal(false)
    x = 42
    expect(db.isDbType(x)).to.equal(false)
    x = false;
    expect(db.isDbType(x)).to.equal(false)
    done()
  })

  it("Checks for properties with incorrect types", function(done) {
    [
      { fred: 0 },
      { fred: "Hello" },
      { fred: true },
      { fred: ["a", "b"] },
      { fred: { fred: 0 } },
      { fred: { fred: { fred: "Anything" } } },
      { fred: { fred: true } },
      { fred: ["a", "b"] },
      { fred: { fred: "valid", george: 0 } },
      { fred: { fred: "valid", george: { fred: "Anything" } } },
      { fred: { fred: "valid", george: false } },
      { fred: { fred: "valid", george: ["a", "b"] } },
      { fred: { fred: "valid", george: [] } },

    ].forEach( (value) => {
      const tmp:any = value;
      expect(db.isDbType(tmp)).to.equal(false)
   
    })

    done()
  })
})

describe("Database initialization", function () {
  it("Empty", function (done) {
    const testDb1: DatabaseType = DatabaseType.create(emptyDB);
    // console.log("result");
    // console.log(testDb1);
    expect(testDb1).to.be.a("object");
    const outDb: dbType = testDb1.save();
    expect(outDb).to.be.a("object");
    expect(outDb).to.deep.equal({});
    done();
  });
  it("With data", function(done) {
    const testDb2: DatabaseType = DatabaseType.create(dbTest1);
    expect(testDb2).to.be.a("object");
    const outDb: dbType = testDb2.save();
    expect(outDb).to.be.a("object");
    expect(outDb).to.deep.equal(dbTest1);
    const val:string = testDb2.getData("page2", "item3");
    expect(val).to.equal("Fetched item 3");
    done();
  })
  it("Using constructor with no data", function (done) {
    const testDb1: DatabaseType = new DatabaseType(emptyDB);
    // console.log("result");
    // console.log(testDb1);
    expect(testDb1).to.be.a("object");
    const outDb: dbType = testDb1.save();
    expect(outDb).to.be.a("object");
    expect(outDb).to.deep.equal({});
    done();
  });
  it("Using constructor with data", function (done) {
    const testDb2: DatabaseType = new DatabaseType(dbTest1);
    expect(testDb2).to.be.a("object");
    const outDb: dbType = testDb2.save();
    expect(outDb).to.be.a("object");
    expect(outDb).to.deep.equal(dbTest1);
    const val: string = testDb2.getData("page2", "item3");
    expect(val).to.equal("Fetched item 3");
    done();
  })
})

describe("Load and save", function () {
  it("Load");
  it("Save");
});

describe("getData and storeData", function() {
  it("getData");
  it("saveData");
});

export default emptyDB;
