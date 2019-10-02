import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data ,
  public dialogRef:MatDialogRef<ConfirmationComponent>) { }

  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close(false);
  }


}
