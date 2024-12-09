import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(process.env.TEMP_UPLOAD_PATH as string));
    },
    filename: function (req, file, cb) {
        const extArray = file.mimetype.split('/');
        const extension = extArray[extArray.length - 1];
        const uniqueSuffix = uuidv4();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
    }
});

const upload = multer({storage: storage});

export default upload;