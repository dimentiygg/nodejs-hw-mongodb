export const sortOrderList = ['asc', 'desc'];
export const typeList = ['work', 'home', 'personal'];
export const contactsFieldList = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];
import path from 'node:path';

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const ACCESS_TOKEN_LIFETIME = 15 * 60 * 1000;

export const REFRESH_TOKEN_LIFETIME = 30 * 24 * 3600 * 1000;

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.resolve('src', 'temp');

export const TEMP_PUBLIC_DIR = path.resolve('src', 'public');

export const TEMP_PHOTO_DIR = path.resolve('src', 'public', 'photo');

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');
