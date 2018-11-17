import { NgModule } from '@angular/core';
import { 
    MatCardModule, 
    MatInputModule, 
    MatButtonModule, 
    MatToolbarModule, 
    MatExpansionModule,  
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
  } from '@angular/material';

@NgModule({
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDialogModule,
    ]
})

export class AngularMaterialModule {}