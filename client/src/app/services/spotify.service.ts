import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //console.log (this.expressBaseUrl + endpoint)
    var p = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    
    return p.then((data) => {
      return data;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    return this.sendRequestToExpress("/search/" + category + "/" + encodeURIComponent(resource)).then((data) => {
      
      var a = data[category + "s"]["items"];
      return a.map((item) => {
        if (category == "artist"){
          return new ArtistData(item);
        } else if (category == "track"){
          return new TrackData(item);
        } else if (category == "album"){
          return new AlbumData(item);
        } else {
          return null
        }
      });
      
      

    })
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.

    //return null;
  }

  getArtist(artistId:string):Promise<ArtistData> {
    return this.sendRequestToExpress("/artist/" + encodeURIComponent(artistId)).then((data) => {
      return new ArtistData(data);
    })
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    //return null;
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //'/artist-related-artists/:id'
    return this.sendRequestToExpress("/artist-related-artists/" + encodeURIComponent(artistId)).then((data) => {
      var a = data['artists'];
      return a.map((item) => {
        return new ArtistData(item);
      });
    });
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
   //return null;
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    // /artist-top-tracks/:id
    return this.sendRequestToExpress("/artist-top-tracks/" + encodeURIComponent(artistId)).then((data) => {
      var a = data['tracks'];
      return a.map((item) => {
        return new TrackData(item);
      });
      
    });
    //TODO: use the top tracks endpoint to make a request to express.
    //return null;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    ///artist-albums/:id
    return this.sendRequestToExpress("/artist-albums/" + encodeURIComponent(artistId)).then((data) => {
      console.log(data);
      var a = data['items'];
      return a.map((item) => {
        return new AlbumData(item);
      });
      
    });
    //TODO: use the albums for an artist endpoint to make a request to express.
    //return null;
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    ///album/:id
    return this.sendRequestToExpress("/album/" + encodeURIComponent(albumId)).then((data) => {
      return new AlbumData(data);
    })
    //TODO: use the album endpoint to make a request to express.
    //return null;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    ///album-tracks/:id
    return this.sendRequestToExpress("/album-tracks/" + encodeURIComponent(albumId)).then((data) => {
      //console.log(data);
      var a = data['items'];
      return a.map((item) => {
        return new TrackData(item);
      });
      
    });
    //TODO: use the tracks for album endpoint to make a request to express.
    //return null;
  }

  getTrack(trackId:string):Promise<TrackData> {
    ///track/:id
    return this.sendRequestToExpress("/track/" + encodeURIComponent(trackId)).then((data) => {
      return new TrackData(data);
    })
    //TODO: use the track endpoint to make a request to express.
    //return null;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    ///track-audio-features/:id
    return this.sendRequestToExpress("/track-audio-features/" + encodeURIComponent(trackId)).then((data) => {

      return TrackFeature.FeatureTypes.map((f) => {
        return new TrackFeature(f, data[f]);
      });
      
    });
    //TODO: use the audio features for track endpoint to make a request to express.
    return null;
  }
}
