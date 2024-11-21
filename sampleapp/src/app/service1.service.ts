import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service1Service {
  save(params:any){
    console.log(params,"its here")
    
    return this.http.post('http://127.0.0.1:8000/reg',params)
  }
  savelogin(params:any){
    console.log(params,"its here")
    
    return this.http.post('http://127.0.0.1:8000/log',params)
  }

  task_save(params:any){
    console.log(params,"its here")
    
    return this.http.post('http://127.0.0.1:8000/task',params)
  }
  task_view(data:any){
    console.log(data,"id is passing")
    return this.http.get('http://127.0.0.1:8000/task_view/?user1_id='+data)
  }
  updateTask(taskId: number, data: any){
    return this.http.put('http://127.0.0.1:8000/task/'+taskId, data);
  }
  
  changestatus(taskId: number, data: any) {
    return this.http.put('http://127.0.0.1:8000/task/'+taskId, data);
}


  deleteTask(taskId: number) {
    console.log(taskId,"in service")
    return this.http.delete('http://127.0.0.1:8000/task'+"/"+taskId)
  }
  constructor(public http:HttpClient) { }
}
