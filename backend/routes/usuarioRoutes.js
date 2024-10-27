const express = require('express');
const { getUsuarios } = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', getUsuarios);

module.exports = router;