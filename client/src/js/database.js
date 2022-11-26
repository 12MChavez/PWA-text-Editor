import { openDB } from "idb";

const initdb = async () =>
  openDB("textEditor", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("textEditor")) {
        console.log("textEditor database already exists");
        return;
      }
      db.createObjectStore("textEditor", {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("textEditor database created");
    },
  });

// Added logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Open database with name = textEditor, version = 1
  const db = await openDB("textEditor", 1);
  const transaction = db.transaction(["textEditor"], "readwrite");

  // if request successful
  transaction.oncomplete = function (event) {
    console.log("opened indexDB readwrite transaction");
  };
  // if error
  transaction.onerror = function (event) {
    console.log("Error: data not added to indexedDB");
  };

  const objStore = transaction.objectStore("content");
  const request = objStore.add({ key: "content", value: content });

  request.onsuccess = (event) => {
    console.log(`data added to indexedDB: ${request.result}`);
  };
};

// Added logic for a method that gets all the content from the database
export const getDb = async () => {
  // Open database with name = textEditor, version = 1
  const db = await openDB("textEditor", 1);
  const transaction = db.transaction(["textEditor"], "readonly");

  const objStore = transaction.objectStore("content");
  const request = objStore.get("content");

  // if error
  request.onerror = (event) => {
    console.log(`Error: data not retrieved from indexedDB`);
  };
  // if request successful
  request.onsuccess = (event) => {
    console.log(`data retrieved from indexedDB: ${request.result}`);
  };

  return request.value;
};

initdb();
