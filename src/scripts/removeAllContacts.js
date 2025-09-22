import { writeContacts } from '../utils/writeContacts.js';
export const removeAllContacts = async () => {
  try {
    await writeContacts([]);
  } catch {
    console.log('Помилка під час видалення контактів');
  }
};

removeAllContacts();
