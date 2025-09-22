import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';
/* import path from 'path'; */

export const readContacts = async () => {
  try {
    /*  console.log('Абсолютний шлях до файлу:', path.resolve(PATH_DB)); */ // Для перевірки шляху
    const data = await fs.readFile(PATH_DB, 'utf-8');
    return JSON.parse(data || '[]');
    /*     const jsonData = JSON.parse(data);
    console.log(jsonData); */
  } catch (error) {
    console.error('Помилка при читанні файлу:', error.message);
  }
};

readContacts();
