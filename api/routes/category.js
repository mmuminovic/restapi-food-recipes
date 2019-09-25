const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../', '../', 'uploads') + '/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/', categoryController.getCategories);

router.post('/', checkAuth, upload.single('image'), categoryController.addCategory);

router.patch('/:categoryId', checkAuth, categoryController.editCategory);

router.get('/:categoryId', categoryController.getCategory);

router.delete('/:categoryId', checkAuth, categoryController.deleteCategory);


module.exports = router;