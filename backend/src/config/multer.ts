import multer from "multer";
import path from "path";
import crypto from "crypto";

// CORREÇÃO: Apontando para 'backend/app/uploads'
// Sobe 2 níveis (../../) e entra em 'app/uploads'
const uploadsFolder = path.resolve(__dirname, '..', '..', 'app', 'uploads');

export default {
    directory: uploadsFolder,
    storage: multer.diskStorage({
        destination: uploadsFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName);
        }
    })
};