/* import * as fs from 'node:fs/promises'; */ /* ****** */
/* import path from 'node:path'; */ /* ****** */
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { updateContact } from '../services/contacts.js';
import { deleteContact } from '../services/contacts.js';
import { createContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

/* export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
}; */

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);

  /* if (!contact) {
    res.status(404).json({
      message: 'Contact not found',
    });
    return;
  } */

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

/* export const createContactController = async (req, res, next) => {
  try {
    const payload = req.body;
    const userId = req.user._id;
    const contact = await createContact(payload, userId);

    res.status(201).json({
      status: 201,
      message: 'Contact created successfully!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}; */
export const createContactController = async (req, res, next) => {
  try {
    const payload = req.body;
    const userId = req.user._id;
    const photo = req.file;
    let photoUrl;

    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
      payload.photo = photoUrl; // Додайте URL фото до payload
    }

    const contact = await createContact(payload, userId);
    res.status(201).json({
      status: 201,
      message: 'Contact created successfully!',
      data: contact, // Тепер це включатиме "photo": "your-uploaded-url", якщо файл був наданий
    });
  } catch (error) {
    next(error);
  }
};
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const result = await updateContact(contactId, req.body, userId, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

/* export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const result = await updateContact(contactId, req.body, userId, photoUrl);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
}; */

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    const payload = req.body;
    const photo = req.file;
    let photoUrl;

    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
      payload.photo = photoUrl; // Додати або оновити поле photo в payload
    }

    const result = await updateContact(contactId, payload, userId);

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const userId = req.user._id;
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
