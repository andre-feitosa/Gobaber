import multer from 'multer'
import { extname, resolve } from 'path'

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', 'database', 'uploads'),
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`
            cb(null, fileName)
        }
    }),
}