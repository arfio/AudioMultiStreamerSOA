import React from "react";
import Axios from "axios";
import SC from "soundcloud";
import Sound from "react-sound";
import temp from "temp";
import fs from "fs";
import path from "path";
import request from "request";

const clientIdList = require("./client_id.json");

const soundcloudClientId = clientIdList.soundCloudClientId;
const jamendoClientId = clientIdList.jamendoClientId;

function throwAbstractError() {
  throw `This class is abstract. This method should be implemented in the \
child class to provide specialized behaviour.`;
}

class AbstractApi {
  static searchMusic(query) {
    return Axios.get(this.getSearchMusicURL(query))
    .then(res => res.data);
  }

  static getSearchMusicURL(query) { throwAbstractError(); }
  static extractMusicObjectFromResult(result) { throwAbstractError(); }
}

export class SoundcloudApi extends AbstractApi {
  static isInitialized = false;

  static initializeIfNotInitialized() {
    if (this.isInitialized) return;
    else SC.initialize({
      client_id: soundcloudClientId
    });
  }

  static getSearchMusicURL(query) {
    return `http://localhost:3001/search/SoundcloudApi/${query}`;

  }

  static extractMusicObjectFromResult(result) {
    return result.map((track, index) => {
      return {
        title: track.title,
        duration: Math.round(track.duration / 1000),
        musicId: track.id,
        author: track.user.username,
        position: index,
        provider: "SoundcloudApi",
        streamable: track.streamable,
        downloadable: track.downloadable,
      };
    });
  }
}

export class JamendoApi extends AbstractApi {
  static getSearchMusicURL(query) {
    return `http://localhost:3001/search/JamendoApi/${query}`;

  }

  static extractMusicObjectFromResult(result) {
    return result.results.map((track) => {
      return {
        title: track.name,
        duration: track.duration,
        musicId: track.id,
        author: track.artist_name,
        position: track.position,
        provider: "JamendoApi"
      };
    });
  }
}

export class DeezerApi extends AbstractApi {
  static getSearchMusicURL(query) {
    return `http://localhost:3001/search/DeezerApi/${query}`;
  }

  static extractMusicObjectFromResult(result) {
    return result.data.map((track, index) => {
      return {
        title: track.title,
        duration: track.duration,
        musicId: track.id,
        author: track.artist.name,
        position: index,
        preview: track.preview,
        provider: "DeezerApi"
      };
    });
  }
}

export function getAllApis() {
  return [SoundcloudApi, JamendoApi, DeezerApi];
};

export function getApi(name) {
  return getAllApis().find(api => api.name === name);
};