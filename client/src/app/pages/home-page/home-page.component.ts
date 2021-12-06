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
      "id": "2918T2ucPJn7lIxP0IGZnW",
      "name": "Pompeii",
      "artist": "Bastille",
      "filename" : "Pompeii.mp3"
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
    if(this.gesture.includes("Point")){
      this.nextsong();
    }
  }

  nextsong(){
    if (this.audio != null){
      this.audio.pause();
    }
    var rnum = Math.floor(Math.random() * (this.local_songs.length));
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
      //redirect to track page
    }
  }
  
}
