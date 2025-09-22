import { writeContacts } from './writeContacts.js';

// Тестові дані для перевірки
const testContacts = [
  { id: 1, name: 'John Doe', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', phone: '098-765-4321' },
];

// Виклик функції
(async () => {
  await writeContacts(testContacts);
  console.log('Контакти успішно записано!');
})();
