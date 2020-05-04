import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task',
  providers: [TaskService],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  id: number;

  fileData: File = null;
  previewUrl:any = null;
  uploadedFilePath: string = null;
  isImage: boolean = false;

  constructor(
    route: ActivatedRoute,
    private serv: TaskService,
    private router: Router
  ) { 
    this.id = route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    this.isImage = false;
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
    this.isImage = true;
  }

  onSubmit() {
    const formData = new FormData();
      formData.append('file', this.fileData);
      this.serv.uploadFile(formData)
        .subscribe(res => {
          this.uploadedFilePath = res[0].path;
        })
  }
}
