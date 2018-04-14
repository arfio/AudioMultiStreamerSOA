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

self.searchMusic = function(provider, query, res){
    switch (provider) {
        case providers.jamendo:
            let jamendoSearchUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientIdList.jamendoClientId}&format=json&namesearch=${query}`;
            request.get(jamendoSearchUrl).pipe(res);
            break;

        case providers.soundCloud:
            initializeIfNotInitialized();
            SC.get(`/tracks/${query}`, function(err, tracks){
                console.log(tracks);
                if (err) {
                    console.log(err);
                } else {
                    console.log(tracks);
                }
            });
            break;

        case providers.deezer:
            let deezerSearchUrl = `https://api.deezer.com/search?q=${query}`;
            request.get(deezerSearchUrl).pipe(res);
            break;
    }
}

function initializeIfNotInitialized(){
    if (isInitialized) return;
    else {
        SC.init({ id: clientIdList.soundcloudClientId });
        isInitialized = true;
    }
}

module.exports = self;