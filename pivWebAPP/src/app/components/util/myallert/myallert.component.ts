import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../blealternativo/blealternativo.component';

@Component({
  selector: 'app-myallert',
  templateUrl: './myallert.component.html',
  styleUrls: ['./myallert.component.css']
})
export class MyallertComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
