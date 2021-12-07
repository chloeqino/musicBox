import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AnyRecord } from 'dns';

import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  answer:Number = 0;
  gesture: String = "";
  current:any;
  next:boolean = false;
  rightmsg:String = "";
  leftmsg:String = "";
  check:String="";
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
  ];
  constructor() { }

  ngOnInit(): void {
    this.current = this.quizzes[this.index];
  }

  toNext()
  { 
    this.index++;
    if(this.index>=this.quizzes.length)
    {
      this.index=0;
    }
    this.current = this.quizzes[this.index];
    this.next=false;
    this.check="";
    this.rightmsg="";
    this.leftmsg="";
    
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
