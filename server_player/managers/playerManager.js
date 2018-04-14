"use strict";
const clientIdList = require("../../client_id.json");
const request = require('request');

const providers = {
    jamendo: "JamendoApi",
    soundCloud: "SoundcloudApi",
    deezer: "DeezerApi"
}

var self = {};
self.playMusic = function(provider, track, res) {
    let downloadUrl = "";
    switch (provider) {
        case providers.jamendo:
            downloadUrl = `https://api.jamendo.com/v3.0/tracks/file/?\
client_id=${clientIdList.jamendoClientId}&id=${track.musicId}`;
            break;
        case providers.soundCloud:
            downloadUrl = `http://api.soundcloud.com/tracks/${track.musicId}/stream?\
client_id=${clientIdList.soundCloudClientId}`;
            break;
        case providers.deezer:
            downloadUrl = track.preview;
            break;
        default:
            res.status(400).send("Provider not found.");
            return;
    }
    request.get(downloadUrl).pipe(res);
}
module.exports = self;
