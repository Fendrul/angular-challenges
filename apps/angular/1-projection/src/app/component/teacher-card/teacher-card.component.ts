import { DataSource } from '@angular/cdk/table';
import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Student } from '../../model/student.model';
import {
  CardComponent,
  CardListItemDirective,
  TypeToken,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card class="bg-light-red" [list]="teachers()" (added)="addTeacher()">
      <img
        card-header
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="Teacher Image" />

      <ng-template card-list-item [dataType]="studentType" let-teacher>
        <app-list-item (deleted)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }} - {{ teacher.lastName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgOptimizedImage,
    CardListItemDirective,
    ListItemComponent,
    CardListItemDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  studentType = new TypeToken<Student>();
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }

  protected readonly DataSource = DataSource;
  protected readonly TeacherStore = TeacherStore;
}
