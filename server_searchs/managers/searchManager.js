"use strict";

const clientIdList = require("../../client_id.json");
const request = require('request');

const providers = {
    jamendo: "JamendoApi",
    soundCloud: "SoundcloudApi",
    deezer: "DeezerApi"
}

var self = {};

self.searchMusic = function(provider, query, res){
    switch (provider) {
        case providers.jamendo:
            let jamendoSearchUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientIdList.jamendoClientId}&format=json&namesearch=${query}`;
            request.get(jamendoSearchUrl).pipe(res);
            break;

        case providers.soundCloud:
            let soundcloudSearchUrl = `http://api.soundcloud.com/tracks?q${query}&client_id=${clientIdList.soundCloudClientId}`;
            request.get(soundcloudSearchUrl).pipe(res);
            break;

        case providers.deezer:
            let deezerSearchUrl = `https://api.deezer.com/search?q=${query}`;
            request.get(deezerSearchUrl).pipe(res);
            break;
    }
}

module.exports = self;