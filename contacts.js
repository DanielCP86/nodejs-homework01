const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function generateUniqueId() {
  return uuid.v4().replace(/-/g, "").slice(0, 21);
}

async function checkPath() {
  const pathToCheck = contactsPath;

  try {
    await fs.access(pathToCheck);
    console.log("Path exists.");
  } catch (error) {
    console.log("Path does not exist.");
  }
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const id = String(contactId);
  const result = contacts.find((item) => item.id == id);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  console.log(index);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: generateUniqueId(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  checkPath,
};
