const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const multerUploads = require('./../config/multerConfig');
const isAuthenticated = require('./../middleware/isAuthenticated');

const { create, getAll, getBuzzByUserId,
    markLikeOnBuzz, markDislikeOnBuzz,
    removeBuzz, updateBuzz } = require('./../controllers/buzzController');


// authentication middleware 
// router.use(isAuthenticated);


//routes
router.post('/create', multerUploads, create);

router.get('/all/:pageNumber/:size', getAll);

router.get('/myBuzz', getBuzzByUserId);

router.post('/like/:buzzId', markLikeOnBuzz);

router.post('/dislike/:buzzId', markDislikeOnBuzz);

router.patch('/update/:buzzId', multerUploads, updateBuzz);

router.delete('/:buzzId', removeBuzz);

//export 
module.exports = router;