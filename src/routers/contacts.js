import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
/* import { checkRoles } from '../middlewares/checkRoles.js'; */
/* import { ROLES } from '../constants/index.js'; */

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
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
router.get(
  '/:contactId',
  /* checkRoles(ROLES.TEACHER, ROLES.PARENT), */
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.delete(
  '/:contactId',
  /* checkRoles(ROLES.TEACHER), */
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.post(
  '/',
  /* checkRoles(ROLES.TEACHER), */
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.put(
  '/:contactId',
  /* checkRoles(ROLES.TEACHER), */
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  /* checkRoles(ROLES.TEACHER, ROLES.PARENT), */
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
