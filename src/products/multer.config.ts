import { diskStorage } from 'multer';

import { extname } from 'path';

import { randomUUID } from 'crypto';

export const productStorage =
  diskStorage({
    destination:
      './uploads/products',

    filename(
      req,
      file,
      callback,
    ) {
      callback(
        null,
        `${Date.now()}-${randomUUID()}${extname(
          file.originalname,
        )}`,
      );
    },
  });

export const imageFileFilter = (
  req,
  file,
  callback,
) => {
  if (
    !file.mimetype.match(
      /\/(jpg|jpeg|png|webp)$/i,
    )
  ) {
    return callback(
      new Error(
        'Only image files are allowed',
      ),
      false,
    );
  }

  callback(
    null,
    true,
  );
};