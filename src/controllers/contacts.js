import {
  getAllContacts,
  getContactById,
  deleteContact,
  updateContact,
  addContact,
} from '../../src/services/contacts.js';
import createHttpError from 'http-errors';
import parsedPaginationParams from '../utils/parsePaginationParams.js';
import ParseSortParams from '../utils/parseSortParams.js';
import { contactsFieldList } from '../constants/constants.js';
import parseContactsFitlerParams from '../utils/parseContactsFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsedPaginationParams(req.query);
  const { sortBy, sortOrder } = ParseSortParams(req.query, contactsFieldList);
  const filter = parseContactsFitlerParams(req.query);

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

  const contactById = await getContactById(contactId);

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
  const contact = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body);

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

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
