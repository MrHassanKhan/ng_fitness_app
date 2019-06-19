import { Exercise } from '../exercise.model';
import * as fromRoot from '../../appstate/app.reducer';
import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingStateModel {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise;
}

export interface TrainingState extends fromRoot.AppState {
    training: TrainingStateModel;
}

const initialState: TrainingStateModel = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
};

export function trainingReducer (state = initialState , action: TrainingActions): TrainingStateModel {
    // console.log('Action: ' + JSON.stringify(action) + '\nState: ' + JSON.stringify({...state}));
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {...state, availableExercises: action.payload };
        case SET_FINISHED_TRAININGS:
            return {...state, finishedExercises: action.payload };
        case START_TRAINING:
            return { ...state, activeTraining: state.availableExercises.find(ae => ae.id === action.payload)};
        case STOP_TRAINING:
            return { ...state, activeTraining: null};
        default:
            return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingStateModel>('training');


export const getAvailableExercises = createSelector( getTrainingState, (state: TrainingStateModel) => state.availableExercises);
export const getFinishedExercises = createSelector( getTrainingState, (state: TrainingStateModel) => state.finishedExercises);
export const getActiveTraining = createSelector( getTrainingState, (state: TrainingStateModel) => state.activeTraining);
export const getIsTraining = createSelector( getTrainingState, (state: TrainingStateModel) => state.activeTraining !== null);


