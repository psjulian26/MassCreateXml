import { Component, ɵConsole } from '@angular/core';
import { Router } from "@angular/router";
import { SapTemplateComponent } from '../sap-template/sap-template.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{



  SelJob: string;
  Jobs: string[] = ['Sap Job', 'Non-Sap Job'];
  SelEnv: string;
  Envs: string[] = ['Production', 'Lower-Production'];
  errormsg:string;

  constructor(private router: Router) { }
   

  validateMe(){
    
    var isNotEnvOk=(this.SelEnv==undefined);
    var isNotJobOk=(this.SelJob==undefined);

    // console.log(isNotEnvOk);
    // console.log(isNotJobOk);

      if (isNotJobOk || isNotEnvOk){
        if (isNotEnvOk && isNotJobOk){
          this.errormsg="Invalid Job Type ans Environment!";
        }else if (isNotEnvOk){
          this.errormsg="Invalid Environment!";
        }else if (isNotJobOk){
          this.errormsg="Invalid Job Type!";
        }      
        
      }else{
        console.log(this.SelJob);
        console.log(this.SelEnv);

        this.errormsg="";
        this.router.navigate(['/sap' ])
        .then(success => console.log('navigation success?' , success))
        .catch(console.error);

      } 
  }

}
