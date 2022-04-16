import express from 'express'
import { createCategoryController, deleteCategoryController, getCategoriesByPagingController, getForChooseCategoryController, updateCategoryController } from '../controller/category.controller'
import { deleteTagController, getForChooseController, getTagsByPagingController } from '../controller/tag.controller'

import { verifyUserToken } from '../middleware/userAuth'

const router = express.Router()

router.post('/', verifyUserToken, createCategoryController)
router.get('/', verifyUserToken, getCategoriesByPagingController)
router.get('/get-for-choose', verifyUserToken, getForChooseCategoryController)
router.put('/:id', verifyUserToken, updateCategoryController)
router.delete('/:id', verifyUserToken, deleteCategoryController)


export default router