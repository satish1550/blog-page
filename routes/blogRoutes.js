const express = require('express');
const blogController = require('../controllers/blogController');
const verify = require('../routes/varifyToken');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/create', blogController.blog_create_get); 
router.get('/',blogController.blog_index);
router.post('/',verify, jsonParser , bodyParser.urlencoded( { extended: false } ), blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports= router;