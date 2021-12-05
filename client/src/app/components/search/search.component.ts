import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'track';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  istrack:boolean = false;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    
    this.spotifyService.searchFor('track', this.searchString).then((data) => {
      this.resources = data;
      this.istrack = this.searchCategory == "track" ? true : false;
    });
    //TODO: call search function in spotifyService and parse response
  }

}
