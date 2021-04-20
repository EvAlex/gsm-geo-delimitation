import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { SearchFormComponent } from './search-form.component';

@NgModule({
  declarations: [SearchFormComponent],
  exports: [SearchFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
  ],
})
export class SearchFormModule {}
