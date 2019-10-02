import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DateCompareValidator } from '../dateValidator';
import { Application } from '../models/Application';
import { DatePipe } from '@angular/common';
import { CrudService } from '../service/crud.service';


@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {

  
  formGroup: FormGroup;
  message: string;
  isUpdate: any;
  minStartDate = new Date();
  minEndDate = new Date(new Date().getTime() + 24 * 3600 * 1000);
  date  =  new  FormControl(new  Date());
  application:Application={}

  constructor(
              private dialogRef: MatDialogRef<AddApplicationComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Application,private datePipe: DatePipe,private service:CrudService) {
  }

  ngOnInit(): void {
     this.isUpdate=this.data;
      this.initData();
      this.initForm();
  }

  initData(): void {
      this.data = this.isUpdate?this.data:{
        startDate: this.minStartDate,
        endDate: this.minEndDate
      }
     
  }

  initForm(): void {
    this.formGroup = new FormGroup({
        dateFrom: new FormControl(new Date(this.data.startDate), [Validators.required]),
        dateTo: new FormControl(new Date(this.data.endDate), Validators.required)
    }, {validators: DateCompareValidator.fromToValidator});
}

  save(): void {
   const temp= this.formGroup.getRawValue();
   this.data.startDate=temp.dateFrom
   this.data.endDate=temp.dateTo
   if(this.isUpdate){this.service.update(this.data).subscribe()}
   else this.service.create(this.data).subscribe()
   this.dialogRef.close()
 }

 close(){
  this.dialogRef.close()

 }

  

  



}
