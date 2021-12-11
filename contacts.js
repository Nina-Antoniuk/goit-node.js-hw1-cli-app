const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");
const chalk = require("chalk");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

const readDataFromDB = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(chalk.red(error));
  }
};

const listContacts = async () => {
  return await readDataFromDB();
};

const getContactById = async (contactId) => {
  const contacts = await readDataFromDB();
  return contacts.filter((el) => {
    if (el.id === contactId) {
      return el;
    }
  });
};

const removeContact = async (contactId) => {
  const contacts = await readDataFromDB();
  const newContacts = contacts.filter((el) => {
    if (el.id !== contactId) {
      return el;
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContacts;
};

const addContact = async (name, email, phone) => {
  const contacts = await readDataFromDB();
  contacts.push({
    name,
    email,
    phone,
    id: crypto.randomUUID(),
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
