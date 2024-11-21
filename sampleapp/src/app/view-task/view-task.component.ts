import { Component } from '@angular/core';
import { Service1Service } from '../service1.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
//   template: `
//     <p>{{ 'task_name' | translate }}</p>
//     <p>{{ 'task_description' | translate }}</p>
//     <p>Amount: {{ formattedAmount }}</p>
//     <p>Currency: {{ formattedCurrency }}</p>
//     <p>Date: {{ formattedDate }}</p>
//     <button (click)="changeLanguage('en')">English</button>
//     <button (click)="changeLanguage('ml')">Malayalam</button>
//   `
})
export class ViewTaskComponent {
  // user_id:any=""
//   v={user1:0,task_name:"",task_description:"",status:0}
//   constructor(public c:Service1Service,public r:ActivatedRoute,public rr:Router){}
// ary:any=[]
  // ngOnInit(): void {  
  //   this.user_id=this.c.user_id
  //   this.c.task_view(this.user_id).subscribe(
  //     (res:any)=>{
  //       console.log(res)
  //     }
  //   )

    // this.r.queryParams.subscribe(
    //   (res:any)=>{
    //     console.log(res,"here")
    //     // console.log(res['data'],"here")
    //     this.ary=res
    //     console.log(this.ary)
    // this.v['user1']=res['user1']
    // this.v['task_name']=res['task_name']
    // this.v['task_description']=res['task_description']
    // this.v['status']=res['status']
       
  // }
// )
}
// }
