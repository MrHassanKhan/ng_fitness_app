import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule, // imports firebase/storage only needed for storage features
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
    ],
    exports: [
        CommonModule,
        AngularFireModule,
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule, // imports firebase/storage only needed for storage features
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
    ],
    declarations: [],
    providers: [],
})
export class SharedModule { }
