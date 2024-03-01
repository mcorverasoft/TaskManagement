import { Injectable } from '@angular/core';
import { BaseResponseDTO } from '../dtos/base-response-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDTO } from '../dtos/task-dto';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl:string = "http://localhost:8080/api/task"
  constructor(private http:HttpClient) { }

  getTasks():Observable<BaseResponseDTO>{
    return this.http.get<BaseResponseDTO>(this.baseUrl);
  }

  insertTask(task:TaskDTO):Observable<BaseResponseDTO>{
    return this.http.post<BaseResponseDTO>(this.baseUrl,task);
  }

  updateTask(id:number, task:TaskDTO):Observable<BaseResponseDTO>{
    return this.http.put<BaseResponseDTO>(this.baseUrl+"/"+id,task);
  }

  
}
