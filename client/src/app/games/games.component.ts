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
  quizzes: any = [
    {"songurl":"assets/Sunflower.mp3",
  "left":"Ed Sheeran",
"right":"Post Malone",
"key":2},
  ];
  constructor() { }

  ngOnInit(): void {
    this.current = this.quizzes[0];
  }
  onSubmit(){
    if(this.answer==this.current.key)
    {
      console.log("bingo");
    }
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
