var express = require('express')

var controller = require('../controllers/user.controller.js');

var router = express.Router()

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.create);

router.get('/:id/delete', controller.delete);

router.get('/:id/view', controller.view);

router.get('/update/:id', controller.update);

router.post('/update/:id', controller.postUpdate);

router.post("/create", controller.postCreate);


module.exports = router;