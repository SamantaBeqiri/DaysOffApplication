import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { AddApplicationComponent } from '../add-application/add-application.component';
import { Application } from '../models/Application';
import { CrudService } from '../service/crud.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html',
  styleUrls: ['./user-applications.component.css']
})
export class UserApplicationsComponent implements OnInit ,AfterViewInit{
  public dataSource: MatTableDataSource<Application> = new MatTableDataSource();
  public displayedColumns: string[] = ['start date', 'end date', 'status','requestedBy', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public user:User;
  constructor(private dialog: MatDialog,private service:CrudService,public authService:AuthenticationService ) {
   
   }

  ngOnInit() {
   this.authService.getUser().subscribe(user=>this.user=user);
   this.getApp();
  }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
  }

  addApplication(){
    if(this.user.daysNo>0){
    const dialogConfig = this.dialogData();
    this.dialog.open(AddApplicationComponent, dialogConfig).afterClosed().subscribe(res => {
      this.getApp()
    })
  }else{
    alert("no more days left")
  }}

  updateApplication(application){
    const dialogConfig = this.dialogData();
    dialogConfig.data=application;
    this.dialog.open(AddApplicationComponent, dialogConfig).afterClosed().subscribe(res => {
      this.getApp()
    })
    }
dialogData():MatDialogConfig{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  return dialogConfig;
}
deleteApplication(id){
  const dialogConfig = this.dialogData();
   dialogConfig.data={message:'Do you want to delete?'}
   this.dialog.open(ConfirmationComponent,dialogConfig).afterClosed()
   .subscribe(res=>{if (res){ this.service.delete(id).subscribe(res=>{
    this.getApp();
  })} })
 
}

approveApplication(application){
  const dialogConfig = this.dialogData();
  dialogConfig.data={message:'Are you sure you want to approve this application?'}
  this.dialog.open(ConfirmationComponent,dialogConfig).afterClosed()
  .subscribe(res=>{if (res){ this.service.approve(application.id,application).subscribe(res=>{
   this.getApp();
 })} })
  
}

rejectApplication(application){
  const dialogConfig = this.dialogData();
  dialogConfig.data={message:'Are you sure you want to approve this application?'}
  this.dialog.open(ConfirmationComponent,dialogConfig).afterClosed()
  .subscribe(res=>{if (res){ this.service.reject(application.id).subscribe(res=>{
   this.getApp();
 })} })
}

getApp(){
  this.service.getAllApplication().subscribe(res=>{
    this.dataSource.data=res as Application[];
   // console.log(this.dataSource.data[0].requestedBy)
  })
}

differenceInDays(startDate,endDate){
  
  let diff=(new Date(endDate).getTime()-new Date(startDate).getTime())/ (1000 * 3600 * 24);

  return diff

}
}
