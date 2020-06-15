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
