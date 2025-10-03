import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', getContactByIdController);
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
export default router;

/* import { Router } from 'express';
import { getAllContacts, getContactById } from './services/contacts.js';


const router = Router();

router.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

router.get('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({
      message: 'Contact not found',
    });
    return;
  }
  res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});

export default router;
 */
