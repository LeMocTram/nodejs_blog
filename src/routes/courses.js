const express = require('express')
const router = express.Router()
const coursesController = require('../app/controllers/CoursesController')

router.delete('/delete/:id', coursesController.delete)
router.put('/update/:id', coursesController.update)
router.get('/edit/:id', coursesController.edit)
router.get('/create', coursesController.create)
router.post('/store', coursesController.store)
router.get('/:slug', coursesController.detail)

module.exports = router;