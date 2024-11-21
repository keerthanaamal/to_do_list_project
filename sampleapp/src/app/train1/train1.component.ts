import { Component } from '@angular/core';
import { Service1Service } from '../service1.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-train1',
  templateUrl: './train1.component.html',
  styleUrls: ['./train1.component.css']
})
export class Train1Component {
register(data:any){
  console.log(data)
  this.c.save(data).subscribe(
    
    (res:any)=>{
      console.log(res,"here")
      if (res['status']==1){
        alert("success")
        // this.r.navigate(['view'])
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
