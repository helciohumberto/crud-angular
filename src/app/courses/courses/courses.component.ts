import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import {MatIconModule} from '@angular/material/icon';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { SharedModule } from "../../shared/shared.module";


@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  imports: [CommonModule, MatTableModule, MatCardModule, MatToolbarModule, MatProgressSpinnerModule, MatIconModule, SharedModule] // ✅ Adicionando MatToolbarModule
 // ✅ Adicionando MatToolbarModule
})
export class CoursesComponent implements OnInit{

  courses$: Observable <Course[]> ;
  displayedColumns = ['name', 'category'];


  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ){

    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos')
        return of([])
      })
    )
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        animal: errorMsg
      },
    });
  }

  ngOnInit(): void {

  }
}
