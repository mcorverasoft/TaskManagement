import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
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
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule, 
    MatSortModule, 
    MatButtonModule,
    MatIconModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit{
  private tasks:TaskDTO[]=[];
  dataSource = new MatTableDataSource(this.tasks);
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'title', 'description', 'tags', 'startAt','creationDate', 'completed', 'actions'];
  
  public isLinear = false;
  completed: boolean = false;
  state: string='';
  public task!:TaskDTO;
  title: string='';
  description: string='';
  startAt: string='';
  constructor(private taskService:TaskService, 
              private _liveAnnouncer: LiveAnnouncer,
              public dialog: MatDialog){
 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {title: this.title, description: this.description,tags:null, startAt: this.startAt, action:"I"},
      height: '450px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result=='reload!')
        this.taskService.getTasks()
            .subscribe(data=>{
              let response:BaseResponseDTO = data;
              this.dataSource = new MatTableDataSource(response.data.sort((a:TaskDTO, b:TaskDTO) => a.id - b.id));
            });
    });

  }
  
  ngOnInit():void{
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

  onRowClick(task:TaskDTO){
    let keywords=task.tags .split(',').map((tags: string) => tags.trim());
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {id: task.id, title: task.title, description: task.description,tags:keywords, startAt: task.startAt, action:"U"},
      height: '420px',
      width: '800px',
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'home-task-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatDatepickerModule
  ],
  styleUrl: './home.component.css'
})

export class DialogOverviewExampleDialog implements OnInit{
  public firstFormGroup!: FormGroup;
  public secondFormGroup!: FormGroup;
  formControl = new FormControl([]);
  public keywords = this.task.tags;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public task: TaskDTO,
    private _liveAnnouncer: LiveAnnouncer,
    private _formBuilder: FormBuilder,
    private taskService:TaskService, 
    private _snackBar: MatSnackBar
  ) {
    
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

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push(value);
    }
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

    if(this.firstFormGroup.valid){
      this.task.title=this.firstFormGroup.get('title')?.value;
      this.task.description=this.firstFormGroup.get('desc')?.value;
      this.task.tags =this.formControl.value;
      const tagsArray: string[] = this.task.tags;
      this.task.tags = tagsArray.join(', ');
      this.task.startAt=this.secondFormGroup.get('startAt')?.value;
      this.task.completed=this.task.completed;
      if(this.task.action=="I")
          this.taskService.insertTask(this.task).subscribe(data=>{
              let response:BaseResponseDTO = data;
              this._snackBar.open("Task saved", "Saved");
              this.dialogRef.close('reload!');
          });
      else if(this.task.action=="U")
          this.taskService.updateTask(this.task.id, this.task).subscribe(data=>{
            let response:BaseResponseDTO = data;
            this._snackBar.open("Task updated", "Saved");
            this.dialogRef.close('reload!');
          });
    }else
      this._snackBar.open("Please enter all data", "Not Valid");
  }
}
