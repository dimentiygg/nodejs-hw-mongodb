import { contactsFieldList, sortOrderList } from '../constants/constants.js';
import contactsCollection from '../db/models/Contact.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage,
  sortBy = contactsFieldList[0],
  sortOrder = sortOrderList[0],
  filter,
}) => {
  const skip = (page - 1) * perPage;
  const contactsQuery = contactsCollection.find();

  let totalItems = await contactsCollection
    .find()
    .merge(contactsQuery)
    .countDocuments();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
    totalItems = await contactsCollection
      .find()
      .merge(contactsQuery)
      .countDocuments();
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
    totalItems = await contactsCollection
      .find()
      .merge(contactsQuery)
      .countDocuments();
  }

  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const { totalPages, hasNextPage, hasPrevPage } = calcPaginationData({
    total: totalItems,
    perPage,
    page,
  });
  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

export const getContactById = async (id) => {
  const contact = await contactsCollection.findById(id);
  return contact;
};

export const addContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await contactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
