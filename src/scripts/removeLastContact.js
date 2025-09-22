import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';
export const removeLastContact = async () => {
  try {
    const data = await readContacts();
    data.pop();
    await writeContacts(data);
  } catch {
    console.log('Помилка під час видалення останнього контакту');
  }
};

removeLastContact();
