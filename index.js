const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactbyId = await getContactById(id);
      if (contactbyId.length === 0) {
        console.log(chalk.red("no contact was found"));
      }
      console.table(contactbyId);
      break;

    case "add":
      const newContactsList = await addContact(name, email, phone);
      console.table(newContactsList);
      break;

    case "remove":
      const contactsList = await removeContact(id);
      console.table(contactsList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
