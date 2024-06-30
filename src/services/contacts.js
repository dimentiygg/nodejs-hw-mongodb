import contactsCollection from '../db/models/Contact.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactsCollection.findById(contactId);
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
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
