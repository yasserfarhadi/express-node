const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Hello from users' });
});

module.exports = router;
