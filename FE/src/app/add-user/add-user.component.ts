import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../models/User';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  isUpdate: any;
  formGroup: FormGroup;
  constructor( private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: User,private service:CrudService) { }

  ngOnInit() {
    this.isUpdate=this.data;
    this.initData();
    this.initForm();
    console.log(this.data)
  }

  private initData(): void {
    this.data = this.isUpdate ? this.data: {
        name: '',
        surname: '',
        username: '',
        password: '',
       
    };
}

private initForm():void{
  this.formGroup = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    surname: new FormControl(this.data.surname, [Validators.required]),
    username: new FormControl(this.data.username, [Validators.required]),
   
});
if (!this.isUpdate) {
  this.formGroup.addControl('password', new FormControl(this.data.password,
      [Validators.required]));
  
}


}
private save():void{
  const formValue=this.formGroup.getRawValue();
  this.data.name = formValue.name;
        this.data.username = formValue.username;
        this.data.surname = formValue.surname;
        this.data.password = formValue.password;
        if(this.isUpdate){this.service.updateUser(this.data).subscribe()}
 else this.service.addUser(this.data).subscribe()
 this.dialogRef.close()
}
close(){
  this.dialogRef.close()

 }


}
