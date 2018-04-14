var express = require('express');
var router = express.Router();
var playerManager = require('../managers/playerManager');

const commands = {
    play: "play"
}

router.get('/:command/:provider/', function (req, res, next) {
    switch (req.params.command) {
        case commands.play:
            playerManager.playMusic(req.params.provider,
                JSON.parse(req.body.track), res);
            break;
        default:
            res.status(400).send("Command not found");
            break;
    }
});
module.exports = router;
