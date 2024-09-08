const fs = require('node:fs/promises');
const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'public/images' });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/formsub', upload.single('meme'), (req, res) => {
  const path = req.file.path;
  const newPath = `public/images/${req.file.filename}-${req.file.originalname}`;
  fs.rename(path, newPath, (err) => {
    if (err) throw err;
    res.json({ file: req.file });
  });
});
router.post('/formsubarray', upload.array('meme'), async (req, res) => {
  console.log(req.files);
  const allPromises = [];
  req.files.forEach((file) => {
    const path = file.path;
    const newPath = `public/images/${file.filename}-${file.originalname}`;
    allPromises.push(fs.rename(path, newPath));
  });
  await Promise.all(allPromises);
  res.json(req.files);
});

module.exports = router;
