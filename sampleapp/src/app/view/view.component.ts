import { Component } from '@angular/core';
import { Service1Service } from '../service1.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  // originalTasks: any[] = [];
  filteredTasks: any[] = [];
  editingTask: any = null;
  isAddingTask = false;
  isViewingTasks = false;
  isEditing = false;
  tasks: any[] = [];
  currentTask: any = null;
  task_name:string=""
  task_description:string=""
  status:number=0
  user1_id:string=""
  id="";
  constructor(public c:Service1Service,public r:ActivatedRoute,public rr:Router,public translate: TranslateService){}
  switchLanguage(lang: string) {
    this.translate.use(lang);
}
  data={id:0,first_name:"",last_name:"",email:"",username:"",password:"",phone_number:"",gender:""}
  ngOnInit(): void {
    // this.ViewTask();
    this.r.queryParams.subscribe(
      (res:any)=>{
        console.log(res,"here")
        this.data['id']=res['id']
        this.data['first_name']=res['first_name']
        this.data['last_name']=res['last_name']
        this.data['email']=res['email']
        this.data['username']=res['username']
        this.data['password']=res['password']
        this.data['phone_number']=res['phone_number']
        this.data['gender']=res['gender']

        console.log(this.data)
      }
    )
  }
  
  v={user1:0,task_name:"",task_description:"",status:0}
  // uid =this.data['id']
  
  // task(data1:any){
  //   console.log(data1)
  //   this.v['user1']=this.data['id']
  //   this.v['task_name']=data1['task_name']
  //   this.v['task_description']=data1['task_description']
  //   this.v['status']=data1['status']
  //   // this.c.setUser1(this.v['user1']);
  //   this.c.task_save(this.v).subscribe(
    
  //     (res:any)=>{
  //       console.log(res,"here")
  //       if (res['status']==1){
  //         alert("success")
  //         // this.rr.navigate(['t5'])
  //         // this.rr.navigate(['t5'],{queryParams:String(this.v['user1'])})
          
  //       }
  //       else if (res["status"]==2){
  //         alert('failed')
  //       }
  //       else{
  //       alert("already exists")
  //     }
  //     this.isAddingTask = false;
  //     }
  //   )
  // }
  // AddTask() {
  //   this.isAddingTask = true;
  //   this.isViewingTasks = false;
  // }

  saveTask(data1: any) {
    if (this.isEditing && this.currentTask) {
      const updatedTask = {
        ...this.currentTask,
        task_name: data1.task_name,
        task_description: data1.task_description,
        status: data1.status,
      };
      this.c.updateTask(this.currentTask.id, updatedTask).subscribe(
        (res: any) => {
          alert("Task updated successfully!");
          this.loadTasks();
          this.isEditing = false;
          this.isAddingTask = false;
          this.currentTask = null;
        },
        (err) => alert("Failed to update task")
      );
    } else {
      this.v = {
        user1: this.data.id,
        task_name: data1.task_name,
        task_description: data1.task_description,
        status: data1.status,
      };
      this.c.task_save(this.v).subscribe(
        (res: any) => {
          alert("Task saved successfully!");
          this.loadTasks();
          this.isAddingTask = false;
        },
        
      );
    }
  }

  AddTask() {
    this.isAddingTask = true;
    this.isViewingTasks = false;
    this.isEditing = false;
    this.currentTask = null;
  }


  ViewTask() {
    this.isViewingTasks = true;
    this.isAddingTask = false;
    this.loadTasks();
  }
  // editTask(task: any) {
  //   console.log(task,"edit")
  //   this.isAddingTask = true;
  //   this.isViewingTasks = false;
  //   this.editingTask = task;
  //   this.v = { user1: task.user1, task_name: task.task_name, task_description: task.task_description, status: task.status };
  //   console.log(this.v)
  // }
  editTask(task: any) {
    this.isEditing = true;
    this.isAddingTask = true;
    this.currentTask = task;  
    this.v.task_name = task.task_name;
    this.v.task_description = task.task_description;
    this.v.status = task.status;
  }
  deleteTask(taskId: any) {
    console.log(taskId,"to delete id")
      this.c.deleteTask(taskId).subscribe((res: any) => {
        alert("Task deleted successfully!");
        this.ViewTask();
      });

    }


    loadTasks() {
      this.c.task_view(this.data.id).subscribe((response: any) => {
        this.tasks = response.data;
        
        this.filteredTasks = this.tasks; 
        console.log(this.filteredTasks,"in loadtasks")
      });
    }
  //   complete(task: any) {
  //     const updatedTask = { ...task, status: 1 }; // Set status to 1 (complete)
  //     this.c.updateTaskStatus(task.id, updatedTask).subscribe(
  //         (res: any) => {
  //             alert('Task marked as completed');
  //             this.loadTasks(); 
  //         },
         
  //     );
  // }
  
  // incomplete(taskId: number) {
  //     const updatedTask = { status: 0 };
  //     this.c.updateTaskStatus(taskId, updatedTask).subscribe(
  //         (res: any) => {
  //             alert('Task marked as incomplete');
  //             this.loadTasks(); 
  //         },
         
  //     );
  // }
  change(task: any) {
    const newStatus = task.status === 1 ? 0 : 1; 
    const updatedTask = { ...task, status: newStatus }; 

    this.c.changestatus(task.id, updatedTask).subscribe(
        (res: any) => {
            alert(`Task marked as ${newStatus === 1 ? 'Complete' : 'Incomplete'}`);
            this.loadTasks(); 
        },
       
    );
}

viewCompletedTasks() {
  console.log("completed")
  console.log(this.tasks.filter(task => task.status === 1))
  this.filteredTasks = this.tasks.filter(task => task.status === 1);
}

viewIncompleteTasks() {
  this.filteredTasks = this.tasks.filter(task => task.status === 0);
}

  }
  // ... syntax in JavaScript and TypeScript is called the spread operator. 
  // It’s a shorthand way to copy the properties of an existing object into a new object