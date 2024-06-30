import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  postContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(postContactController));

router.patch('/:contactId', ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
