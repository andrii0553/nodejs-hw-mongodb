import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

const generateContacts = async (contact) => {
  const contacts = await readContacts();

  for (let i = 0; i < contact; i++) {
    contacts.push(createFakeContact());
  }
  await writeContacts(contacts);
};

generateContacts(5);
