import { readContacts } from '../utils/readContacts.js';
export const countContacts = async () => {
  try {
    const data = await readContacts();
    return data.length;
  } catch {
    return 'Error returning the number of contacts in the array';
  }
};

console.log(await countContacts());
