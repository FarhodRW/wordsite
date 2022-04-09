import express from 'express'
import { uploadController } from '../controller/upload.controller'
import { upload } from '../middleware/fileUpload'

const router = express.Router()

router.post('/', upload.single('image'), uploadController)

export default router
