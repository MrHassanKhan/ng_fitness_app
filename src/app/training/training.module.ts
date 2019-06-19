import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training-state/training.reducer';

const routes: Routes = [
    // { path: '', redirectTo: 'main'},
    { path: '', component: TrainingComponent },
];
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('training', trainingReducer)
    ],
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
