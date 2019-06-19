import { NgModule } from '@angular/core';
import { MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule, MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule} from '@angular/material';
@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule, MatSelectModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
    MatSidenavModule, MatToolbarModule, MatListModule,
    MatTabsModule, MatCardModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule, MatSelectModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
    MatSidenavModule, MatToolbarModule, MatListModule,
    MatTabsModule, MatCardModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatSnackBarModule
  ]
})
export class MaterialModule { }
