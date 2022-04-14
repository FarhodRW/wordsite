import express from 'express'
import { createCategoryController, deleteCategoryController, getCategoriesByPagingController, getForChooseCategoryController, updateCategoryController } from '../controller/category.controller'
import { createTagController, deleteTagController, getForChooseController, getTagsByPagingController, updateTagController } from '../controller/tag.controller'

import { verifyUserToken } from '../middleware/userAuth'

const router = express.Router()

router.post('/create', verifyUserToken, createCategoryController)
router.get('/', getCategoriesByPagingController)
router.get('/get-for-choose', getForChooseCategoryController)
router.put('/update/:id', verifyUserToken, updateCategoryController)
router.delete('/delete/:id', verifyUserToken, deleteCategoryController)


export default router