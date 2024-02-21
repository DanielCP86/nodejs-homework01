const contacts = require("./contacts.js");
const argv = require("yargs").argv;

//contacts.listContacts().then((data) => console.table(data));
// contacts
//   .getContactById("AeHIrLTr6JkxGE6SN-0Rw")
//   .then((data) => console.table(data));
// contacts
//   .removeContact("AeHIrLTr6JkxGE6SN-0Rw")
//   .then((data) => console.table(data));
//contacts.addContact("Test1", "test@test.co.uk", "(111) 111-1111");

// TODO: refactorizare
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then((data) => console.table(data));
      break;

    case "get":
      contacts.getContactById(id).then((data) => console.table(data));
      break;

    case "add":
      contacts
        .addContact(name, email, phone)
        .then((data) => console.table(data));
      break;

    case "remove":
      contacts.removeContact(id).then((data) => console.table(data));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
