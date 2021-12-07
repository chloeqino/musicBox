import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AnyRecord } from 'dns';

import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  switch = false;
  on:boolean = true;
  answer:Number = 0;
  gesture: String = "";
  current:any;
  next:boolean = false;
  rightmsg:String = "";
  leftmsg:String = "";
  check:String="";
  currentaudio="";
  index = 0;
  quizzes: any = [
    {"songurl":"assets/Sunflower.mp3",
  "left":"Ed Sheeran",
"right":"Post Malone",
"key":2},
{
  "songurl":"assets/No Tears Left To Cry.mp3",
  "left":"Ariana Grande",
  "right":"Doja Cat",
  "key":1
},
{
  "songurl":"assets/The Violence.mp3",
  "left":"Rise Against",
  "right":"System of a Down",
  "key":1
},
{
  "songurl":"assets/Love Story (Taylor’s Version).mp3",
  "left":"Olivia Rodrigo",
  "right":"Taylor Swift",
  "key":2
},
{
  "songurl":"assets/Thunder.mp3",
  "left":"Bastille",
  "right":"Imagine Dragons",
  "key":2
},

  ];
  constructor() { }

  ngOnInit(): void {
    this.current = this.quizzes[this.index];
    this.currentaudio=this.current.songurl;
    
    //document.getElementById("audio").load();
    //document.getElementById("audio").play();
  }
  ngAfterViewInit(){
    document.getElementById("audio").load();
 }
  toNext()
  { 
    this.index++;
    if(this.index>=this.quizzes.length)
    {
      this.index=0;
      this.on = false;
    }
    document.getElementById("audio").load();
    //document.getElementById("audio").play();
    
    this.switch = false;
    this.current = this.quizzes[this.index];
    this.currentaudio = this.current.songurl;
    
    this.next=false;
    this.check="";
    this.rightmsg="";
    this.leftmsg="";
    
    
  }
  back(){
    window.location.href = "/";
  }
  restart(){
    this.on=true;
  }
  onSubmit(){
    if(this.answer==this.current.key)
    {
      console.log("bingo");
      this.check="correct";
    }else{
      this.check="wrong";
    }
    if(this.current.key==1)
    {
      this.leftmsg = "<strong>&#10003;</strong>";
      this.rightmsg = "<strong>X</strong>";
    }else if(this,this.current.key==2)
    {
      this.rightmsg = "<strong class=\"green\">&#10003;</strong>";
      this.leftmsg = "<strong>X</strong>";
    }
    this.next = true;
    this.answer = 0;
    console.log("next");
    this.switch = true;
  }
  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    if(this.gesture=="Left Open Hand and Right Closed Hand"){
      this.answer = 1;
    }
    else if(this.gesture=="Right Open Hand and Left Closed Hand")
    {
      this.answer = 2;
    }
  }
  getAnswer(i){
    this.answer = i;
    console.log(this.answer);
  }
}
