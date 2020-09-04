
import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


var dStr='<?xml version="1.0" encoding="utf-8"?> \n <DEFTABLE>';


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
  // schedule: string;
  // comment: string;
  
}

const ELEMENT_DATA: UsersData[] = [
  // {id: 1560608769632, name: 'Artificial Intelligence',desc:'Test' },

];
@Component({
  selector: 'app-sap-template',
  templateUrl: './sap-template.component.html',
  styleUrls: ['./sap-template.component.css']
})
export class SapTemplateComponent {
  displayedColumns: string[] = ['id', 'environment','job','folder','foldername','subfoldername','command','host','runas','incond','description','application','subapplication','smartfolder','subfolder','action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}


  generateXML(){   


    if (this.dataSource.length==0) {
      console.log('No Data to Generate XML');
    }else{
      console.log('Generate XML');
      console.log(this.dataSource);
      
      this.writeContents(dStr, 'Output XML'+'.xml', 'text/plain');
      
      
    }
     
  }

  writeContents(content, fileName, contentType) {
    var a = document.createElement('a');
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }


  openDialog(action,obj) {
    obj.action = action;
    var dWith="";
    if (action=="Delete"){
      dWith='20%';
    }else{
      dWith='55%';
    }

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: dWith,
      data:obj
    });
    
 


    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);     
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      environment:row_obj.environment,      
      job: row_obj.job,
      folder:row_obj.folder,
      foldername: row_obj.foldername,
      subfoldername: row_obj.subfoldername,
      command: row_obj.command,
      host: row_obj.host,
      runas: row_obj.runas,
      incond: row_obj.incond,
      description: row_obj.description,
      application: row_obj.application,
      subapplication: row_obj.subapplication,
      smartfolder: row_obj.smartfolder,
      subfolder: row_obj.subfolder
      // schedule: row_obj.schedule,
      // comment: row_obj.comment

    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        
        value.environment = row_obj.environment;
        value.job = row_obj.job;
        value.folder = row_obj.folder;
        value.foldername = row_obj.foldername;
        value.subfoldername = row_obj.subfoldername;
        value.command = row_obj.command;
        value.host = row_obj.host;
        value.runas = row_obj.runas;
        value.incond = row_obj.incond;
        value.description = row_obj.description;
        value.application = row_obj.application;
        value.subapplication = row_obj.subapplication;
        value.smartfolder = row_obj.smartfolder;
        value.subfolder = row_obj.subfolder;
        // value.schedule = row_obj.schedule;
        // value.comment = row_obj.comment;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}