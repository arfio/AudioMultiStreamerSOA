var express = require('express');
var router = express.Router();
var searchManager = require('../managers/searchManager');


router.get('/:provider/:query', function (req, res, next) {
    var tracks = searchManager.searchMusic(req.params.provider, req.params.query, res);
});

module.exports = router;
