import { Component, OnInit } from '@angular/core';
import * as fromTraining from './training-state/training.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.sass']
})
export class TrainingComponent implements OnInit {

  onGoingTraining$: Observable<boolean>;
  constructor(private store: Store<fromTraining.TrainingState>) { }

  ngOnInit() {
    this.onGoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }

}
