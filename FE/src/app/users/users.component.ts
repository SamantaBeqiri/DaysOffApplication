import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatPaginator } from '@angular/material';
import { User } from '../models/User';
import { CrudService } from '../service/crud.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { flatMap, toArray, filter } from 'rxjs/operators';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit ,AfterViewInit {
  public dataSource: MatTableDataSource<User> = new MatTableDataSource();
  public displayedColumns: string[] = ['name', 'surname', 'username','daysLeft', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(private service:CrudService ,private dialog: MatDialog,private authService :AuthenticationService) { }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.getUsers()

  }
  deleteUser(id){
    const dialogConfig = this.dialogData();
   dialogConfig.data={message:'Do you want to delete?'}
   this.dialog.open(ConfirmationComponent,dialogConfig).afterClosed()
   .subscribe(res=>{if (res){ this.service.deleteUser(id).subscribe(res=>{

    this.getUsers();
  })} })
  }
  getUsers(){
    this.service.getUsers().pipe(
      flatMap(users=>users),
      filter(user=>user.role === 'ROLE_USER'),
      toArray()
    ).subscribe(res=>{
      this.dataSource.data=res as User[];
      console.log(this.dataSource.data[0])
    })
  }
  addUser(){
    const dialogConfig = this.dialogData();
    this.dialog.open(AddUserComponent, dialogConfig).afterClosed().subscribe(res => {
      this.getUsers()
    })}

  updateUser(user){
    const dialogConfig = this.dialogData();
    dialogConfig.data=user;
    this.dialog.open(AddUserComponent, dialogConfig).afterClosed().subscribe(res => {
      this.getUsers()
    })
    }

  dialogData():MatDialogConfig{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    return dialogConfig;
  }

}
