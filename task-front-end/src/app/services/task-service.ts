import { Injectable } from '@angular/core';
import { BaseResponseDTO } from '../dtos/base-response-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl:string = "http://localhost:8080/api/task"
  constructor(private http:HttpClient) { }

  getTasks():Observable<BaseResponseDTO>{
    return this.http.get<BaseResponseDTO>(this.baseUrl);
  }
}
