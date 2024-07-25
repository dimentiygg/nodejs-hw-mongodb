import {
  getAllContacts,
  deleteContact,
  updateContact,
  addContact,
  getContactByFilter,
} from '../../src/services/contacts.js';
import createHttpError from 'http-errors';
import parsedPaginationParams from '../utils/parsePaginationParams.js';
import ParseSortParams from '../utils/parseSortParams.js';
import { contactsFieldList } from '../constants/constants.js';
import parseContactsFitlerParams from '../utils/parseContactsFilterParams.js';
import env from '../utils/env.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';
import saveFileToPublicDir from '../utils/saveFileToPublicDir.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsedPaginationParams(req.query);
  const { sortBy, sortOrder } = ParseSortParams(req.query, contactsFieldList);
  const filter = { ...parseContactsFitlerParams(req.query), userId };

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contactById = await getContactByFilter({ _id: contactId, userId });

  if (!contactById) {
    throw createHttpError(404, 'Sorry, not found contact');
  }

  console.log(contactById);

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contactById,
  });
};

export const postContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl = '';

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(req.file, 'photo');
    } else {
      photoUrl = await saveFileToPublicDir(req.file, 'photo');
    }
  }
  const contact = await addContact({ ...req.body, userId, photo: photoUrl });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl = '';
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(req.file, 'photo');
    } else {
      photoUrl = await saveFileToPublicDir(req.file, 'photo');
    }
  }

  const result = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
