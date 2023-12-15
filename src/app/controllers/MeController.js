const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')
class MeController {

    //[GET] /news
    myCourses = async (req, res, next) => {
        Course.find({})
            .then(courses => {
                res.render('me/myCourses', { courses: multipleMongooseToObject(courses) })
            })
            .catch(next)

    }
}

module.exports = new MeController;