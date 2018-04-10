import React from "react";
import Axios from "axios";
import SC from "soundcloud";
import Sound from "react-sound";
import temp from "temp";
import fs from "fs";
import path from "path";
import request from "request";

const soundcloudClientId = "";
const jamendoClientId = "";
const deezerClientId = "";

function throwAbstractError() {
  throw `This class is abstract. This method should be implemented in the \
child class to provide specialized behaviour.`;
}

class AbstractApi {
  static searchMusic(query) {
    return Axios.get(this.getSearchMusicURL(query))
    .then(res => res.data);
  }

  static playMusic(track) {
    return Axios.get(this.getDownloadMusicURL(track), {
      responseType: "arraybuffer",
      headers: {"Accept": "audio/mpeg"}
    })
    .then((response) => {
      const inputPath = temp.path({suffix: ".mp3"});
      fs.writeFileSync(inputPath, Buffer.from(response.data));
      return {
        path: inputPath,
        status: Sound.status.PLAYING,
        isPlaying: true,
        position: 0,
        musicId: track.musicId,
      };
    });
  }

  static pauseMusic(player, track) {
    return { ...player, status: Sound.status.PAUSED, isPlaying: false };
  }

  static resumeMusic(player, track) {
    return { ...player, status: Sound.status.PLAYING, isPlaying: true };
  }

  static getSearchMusicURL(query) { throwAbstractError(); }
  static getDownloadMusicURL(musicId) { throwAbstractError(); }
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

  static searchMusic(query) {
    this.initializeIfNotInitialized();
    return SC.get("/tracks", { q: query })
    .then(tracks => tracks);
  }

  static getDownloadMusicURL(track) {
    return `http://api.soundcloud.com/tracks/${track.musicId}/stream?\
client_id=${soundcloudClientId}`;
  }

  static playMusic(track) {
    return new Promise(function(resolve, reject) {
      const inputStream = fs.createWriteStream(temp.path({suffix: ".mp3"}));

      request(SoundcloudApi.getDownloadMusicURL(track)).pipe(inputStream)
      .on("finish", () => {
        resolve({
          path: inputStream.path,
          status: Sound.status.PLAYING,
          isPlaying: true,
          position: 0,
          musicId: track.musicId,
        });
      });
    });
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
    return `https://api.jamendo.com/v3.0/tracks/?client_id=${jamendoClientId}\
&format=json&namesearch=${query}`;
  }

  static getDownloadMusicURL(track) {
    return `https://api.jamendo.com/v3.0/tracks/file/?\
client_id=${jamendoClientId}&id=${track.musicId}`;
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
    return `https://api.deezer.com/search?q=${query}`;
  }

  static getDownloadMusicURL(track) {
    return track.preview
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