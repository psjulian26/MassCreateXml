import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNull } from 'util';
import { AbstractControl, ValidationErrors } from '@angular/forms';


export interface UsersData {
  id: number;
  environment: string;
  job: string;
  folder: string;
  foldername: string;
  subfoldername: string;
  command: string;
  host: string;
  runas: string;
  incond: string;
  description: string;
  application: string;
  subapplication: string;
  smartfolder: string;
  subfolder: string;
  schedule: string;
  comment: string;
}
interface Ienvironment {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  action:string;
  local_data:any;
  errormsg:string;


  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }
 

    envs: Ienvironment[] = [
      {value: 'CTMDEV', viewValue: 'CTMDEV'},
      {value: 'CTMTST', viewValue: 'CTMTST'},
      {value: 'CTMSTG', viewValue: 'CTMSTG'},
      {value: 'CTMPRD', viewValue: 'CTMPRD'}
    ];
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
      if((control.value as string).indexOf(' ') >= 0){
          return {cannotContainSpace: true}
      }

      return null;
    }

  doAction(){   

    var dcount=Object.keys(this.local_data).length
    var cboolAdd=(this.action=="Add" && dcount==15);
    var cboolUpdate=(this.action=="Update");;
    var cboolDelete=(this.action=="Delete");;
    var isOk=true;

    //|| this.local_data['folder']=="Y" || this.local_data['folder']==undefined
    if (this.local_data['job']=="Y" || this.local_data['job']==undefined){
      cboolAdd=true;
    }else if (this.local_data['folder']=="Y" || this.local_data['folder']==undefined){
      cboolAdd=true;
    }else{
      cboolAdd=false;
      isOk=false;
      this.errormsg="Invalid data for Job or Folder!";

    }
console.log(this.local_data['job']);

    if (cboolAdd) {  
      console.log("Add ok");
      this.dialogRef.close({event:this.action,data:this.local_data});            
    }else if (cboolUpdate){
      
      Object.keys(this.local_data).forEach(key => {
          var bool=(key=="job" || key=="folder");
              
          if (!bool){
            if (isNull(this.local_data[key]) || this.local_data[key]==""){           
              isOk=false;
            }
          }
        
      
         })
      if (isOk){
        console.log("Update ok");
        this.dialogRef.close({event:this.action,data:this.local_data});
      }else{
        console.log("Update not ok");
      }
      
    }else if (cboolDelete){
      this.dialogRef.close({event:this.action,data:this.local_data});
    }else if (cboolAdd==false && cboolUpdate==false){
      console.log("Error");
    }
      
  }    
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}