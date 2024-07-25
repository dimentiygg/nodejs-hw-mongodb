import express from 'express';
import validateBody from '../middlewares/ValidateBody.js';
import {
  userLoginSchema,
  userRegisterSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/userSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  resetPasswordController,
  SendResetEmailController,
} from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  validateBody(userLoginSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(SendResetEmailController),
);
export default authRouter;

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
