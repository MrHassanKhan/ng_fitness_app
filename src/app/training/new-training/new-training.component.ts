import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromtraining from '../training-state/training.reducer';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../appstate/app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: Exercise[];
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromtraining.TrainingState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.store.select(fromtraining.getAvailableExercises).subscribe(av => {
      this.exercises = av;
    });
    // this.exercises = this.trainingService.getAvailableExercises();
    // this.exercises = this.db.collection('availableExercises').valueChanges();
    // this.exercisesSubscription.push(this.trainingService.exercisesChanged.subscribe(exs => {
    //   this.exercises = exs;
    // }));
    // this.exercisesSubscription.push(this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading));
    this.trainingService.fetchAvailableExercises();
  }
  // ngOnDestroy() {
  //   this.exercisesSubscription.forEach(sub => sub.un  subscribe());
  // }
  StartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
