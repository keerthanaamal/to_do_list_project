import { Component } from '@angular/core';
import { Service1Service } from '../service1.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login(data:any){
    console.log(data)
    this.c.savelogin(data).subscribe(
      
      (res:any)=>{
        console.log(res,"here")
        if (res['status']==1){
          alert("success")
          this.r.navigate(['t3'],{queryParams:res['values']})
        }
        else if (res["status"]==2){
          alert('failed')
        }
        else{
        alert("already exists")
      }
      }
    )
  }
  constructor(public c:Service1Service,public r:Router,public translate: TranslateService){}
  switchLanguage(lang: string) {
    this.translate.use(lang);
}
}
