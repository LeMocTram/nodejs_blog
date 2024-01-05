const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose');
const { render } = require('node-sass');
const { notify } = require('../../routes/courses');
const { json } = require('express');



class CoursesController {




    //[GET] /detail
    detail = (req, res, next) => {
        const query = Course.findOne({ slug: req.params.slug });
        query.exec()
            .then(course => {
                // res.json(course);
                res.render('courses/detailCourse', { course: mongooseToObject(course) })
            })
            .catch(next)

    }
    //[GET] /courses/create

    create = (req, res, next) => {
        res.render('courses/create')
    }

    //[POST] /courses/store
    store = (req, res, next) => {
        const formData = req.body;
        Course.create({
            name: formData.name,
            description: formData.description,
            videoId: formData.videoId,
            image: `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`,
            level: formData.level
        })
            .then(() => {
                res.redirect('/')
                notify('success')

            })
            .catch(next => console.error('Error saving courses to database', next));
    }
    //[GET]courses/edit/:id
    edit = (req, res, next) => {
        const query = Course.findById(req.params.id);
        query.exec()
            .then(course => {
                res.render('courses/edit', { course: mongooseToObject(course) })

            })
            .catch(next)

    }

    update = async (req, res, next) => {
        const formData = req.body;
        const id = req.params.id;
        const updatedData = {
            name: formData.name,
            description: formData.description,
            videoId: formData.videoId,
            image: `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`,
            level: formData.level
        };
        await Course.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true }, // Tùy chọn này để trả về bản ghi đã được cập nhật

        )
            .then(() => {
                res.redirect('/me/stored/courses')


            })
            .catch(next => console.error('Error saving courses to database', next));
    }

    delete = (req, res, next) => {
        Course.delete({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next => console.error('Delete fail', next));
    }
    restore = (req, res, next) => {
        Course.restore({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next);
    }
}

module.exports = new CoursesController;