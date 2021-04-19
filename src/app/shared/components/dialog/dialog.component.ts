import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReviewData} from "../../../models/review-data";

@Component({
  selector: 'review-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class ReviewDialog {
  comment: string

  constructor(
    public dialogRef: MatDialogRef<ReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
