"use strict";

var SC = require('node-soundcloud');
const clientIdList = require("../../client_id.json");
const request = require('request');

const providers = {
    jamendo: "jamendo",
    soundCloud: "soundcloud",
    deezer: "deezer"
}

var isInitialized = false;
var self = {};

module.exports = self;