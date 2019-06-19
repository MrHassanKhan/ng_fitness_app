import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as uiallActions from '../shared/uistate/ui.actions';
import * as trainingAllActions from '../training/training-state/training.actions';
import * as fromTraining from './training-state/training.reducer';

@Injectable({providedIn: 'root'})
export class TrainingService {
    // exerciseChanged = new Subject<Exercise>();
    // exercisesChanged = new Subject<Exercise[]>();
    // finishedExercisesChanged = new Subject<Exercise[]>();
    private afbSubscriptions: Subscription[] = [];
    // private availableExercises: Exercise[] = [
    //     {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    //     {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    //     {id: 'side-lungs', name: 'Side Lungs', duration: 120, calories: 20},
    //     {id: 'burpee', name: 'Burpee', duration: 230, calories: 38},
    //     {id: 'orange-juice', name: 'Orange Juice', duration: 20, calories: 48}
    // ];
    // private availableExercises: Exercise[] = [];
    // private runningExercise: Exercise;

    constructor(private db: AngularFirestore, private uiService: UIService,
        private store: Store<fromTraining.TrainingState>
        ) {}

    fetchAvailableExercises() {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new uiallActions.StartLoading());
        this.afbSubscriptions.push(this.db.collection('availableExercises').snapshotChanges().pipe(
            map(docArray => {
              return docArray.map(doc => {
                return {
                  id: doc.payload.doc.id,
                  ...doc.payload.doc.data()
                };
              });
            })
          ).subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new uiallActions.StopLoading());
            this.store.dispatch(new trainingAllActions.SetAvailableTrainings(exercises));
            //   this.availableExercises = exercises;
            //   this.uiService.loadingStateChanged.next(false);
            //   this.exercisesChanged.next([...this.availableExercises]);
          }, err => {
            this.store.dispatch(new uiallActions.StopLoading());
            this.uiService.showSnackBar('Fetching Exercise Failed', null, 3000);
          }));
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new trainingAllActions.StartTraining(selectedId));
    }

    // getRunningExercise() {
    //     return {... this.runningExercise};
    // }

    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(act => {
            if (act) {
                this.addDataToDataBase({...act, date: new Date().toISOString(), state: 'completed'});
                this.store.dispatch(new trainingAllActions.StopTraining());
            }
        });
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(act => {
            if (act) {
                this.addDataToDataBase({
                    ...act,
                    duration: act.duration * (progress / 100),
                    calories: act.calories * (progress / 100),
                    date: new Date().toISOString(),
                    state: 'cancelled'
                });
                this.store.dispatch(new trainingAllActions.StopTraining());
            }
        });
    }

    cancelledOrCompletedExercises() {
       this.afbSubscriptions.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
        //    this.finishedExercisesChanged.next([...exercises]);
        //    this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new trainingAllActions.SetFinishedTrainings(exercises));
       }));
    }

    private addDataToDataBase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }

    cancelTrainingSubscriptions() {
        this.afbSubscriptions.forEach(sub => sub.unsubscribe());
    }
}
