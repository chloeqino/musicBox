import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { PredictionEvent } from '../../prediction-event';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  local_songs:any = [
    {
      "id": "3CeCwYWvdfXbZLXFhBrbnf",
      "name": "Love Story (Taylor’s Version)",
      "artist": "Taylor Swift",
      "filename" : "Love Story (Taylor’s Version).mp3"
    }, {
      "id": "3KkXRkHbMCARz0aVfEt68P",
      "name": "Sunflower",
      "artist": "Post Malone",
      "filename" : "Sunflower.mp3"
    }, {
      "id": "2918T2ucPJn7lIxP0IGZnW",
      "name": "The Violence",
      "artist": "Rise Against",
      "filename" : "The Violence.mp3"
    }, {
      "id": "6sy3LkhNFjJWlaeSMNwQ62",
      "name": "Counting Stars",
      "artist": "One Republic",
      "filename" : "Counting Stars.mp3"
    }, {
      "id": "3gbBpTdY8lnQwqxNCcf795",
      "name": "Pompeii",
      "artist": "Bastille",
      "filename" : "Pompeii.mp3"
    }, {

      "id": "5dPz35akJjPqb17yeqNwqH",
      "name": "Ghost",
      "artist": "Justin Beiber",
      "filename" : "Ghost.mp3"
    }, {
      "id": "5wANPM4fQCJwkGd4rN57mH",
      "name": "Drivers License",
      "artist": "Olivia Rodrigo",
      "filename" : "Drivers License.mp3"
    }, {
      "id": "1zB4vmk8tFRmM9UULNzbLB",
      "name": "Thunder",
      "artist": "Imagine Dragons",
      "filename" : "Thunder.mp3"
    }, {
      "id": "54bFM56PmE4YLRnqpW6Tha",
      "name": "Therefore I Am",
      "artist": "Billie Eilish",
      "filename" : "Therefore I Am.mp3"
    }, {
      "id": "2qT1uLXPVPzGgFOx4jtEuo",
      "name": "No Tears Left To Cry",
      "artist": "Ariana Grande",
      "filename" : "No Tears Left To Cry.mp3"
    }
  ];
  current:any = null;
  audio:any = null;
  
  gesture: String = "";
  songtitle: String = "click on the start button to play song!";
  constructor() { }

  ngOnInit(): void {
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    if(this.gesture == "Hand Pointing") this.nextsong();
    if(this.gesture == "Closed Hand") this.stopsong();
    if(this.gesture == "Open Hand") this.resumesong();
    if(this.gesture == "Two Open Hands") this.gotopage();

  }

  nextsong(){
    var rnum = Math.floor(Math.random() * (this.local_songs.length));
    if (this.current != null){
      this.audio.pause();
      while (this.local_songs[rnum] == this.current){ //makes sure next song isnt same as last song
        rnum = Math.floor(Math.random() * (this.local_songs.length));
      }
    }
    this.current = this.local_songs[rnum];
    this.audio = new Audio("assets/" + this.current["filename"]);
    this.audio.play();
    this.songtitle = "now playing: "+this.current["name"]+" - "+this.current["artist"];

  }

  stopsong(){
    if(this.audio != null) this.audio.pause();
  }

  resumesong(){
    if(this.audio != null) this.audio.play();
  }

  gotopage(){
    if (this.current != null){
      window.location.href = './track/' + this.current['id'];
    }
  }
  
}
