import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BaseResponseDTO } from '../../dtos/base-response-dto';
import { TaskDTO } from '../../dtos/task-dto';
import { TaskService } from '../../services/task-service';
import { Router } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort,  } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule, 
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatDatepickerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit{
  private tasks:TaskDTO[]=[];
  dataSource = new MatTableDataSource(this.tasks);
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'title', 'description', 'creationDate', 'completed'];
  keywords = ['#angular'];
  public isLinear = false;
  completed: boolean = false;
  state: string='';

  public firstFormGroup!: FormGroup;
  public secondFormGroup!: FormGroup;
  formControl = new FormControl([]);

  constructor(private taskService:TaskService, 
              private _liveAnnouncer: LiveAnnouncer,
              private _formBuilder: FormBuilder){
 
  }
  

  ngOnInit():void{
    
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      tags: ['', Validators.required],
      startAt: ['', Validators.required],
    });

    this.taskService.getTasks()
    .subscribe(data=>{
      let response:BaseResponseDTO = data;
      this.dataSource = new MatTableDataSource(response.data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);

      this._liveAnnouncer.announce(`removed ${keyword}`);
    }
  }

  done(){
    console.log(this.firstFormGroup.valid);
    console.log(this.secondFormGroup.valid);
  }


}
