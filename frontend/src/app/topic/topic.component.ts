import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TopicService } from './topic.service';
import { Topic } from './topic';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './item';

@Component({
  selector: 'app-topic',
  providers: [TopicService],
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

  id: number;
  topic: Topic;
  isChanged: boolean;
  items: Array<Item>;
  isNewRecord: boolean;
  editedItem: Item;

  fileData: File = null;
  previewUrl:any = null;
  isImage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private serv: TopicService,
    private router: Router
  ) { 
    this.id = route.snapshot.params.id;
    this.topic = new Topic(this.id, null, '', '', '');
    this.isChanged = false;
    this.items = new Array<Item>();
    this.isNewRecord = false;
    this.editedItem = null;
  }

  ngOnInit(): void {
    this.loadTopic();
  }

  private loadTopic() {
    this.serv.getTopic(this.id).subscribe((data: Topic) => {
      this.topic = data;
      this.loadItems();
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  private loadItems() {
    this.serv.getItems(this.id).subscribe((data: Item[]) => {
      this.items = data;
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  onChanged() {
    this.isChanged = true;
  }

  saveTopic() {
    this.serv.saveTopic(this.topic).subscribe((data: Topic) => {
      this.topic = data;
      this.isChanged = false;
    })
  }

  loadTemplate(it: Topic) {
    if (this.isNewRecord && !it.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  deleteItem(it: Item) {
    if (confirm("Удалить ответ?")) {
      this.serv.deleteItem(it.id).subscribe(data => {
        this.cancel();
        setTimeout(() => this.loadItems(), 2000);
      });
    }
  }

  cancel() {
    this.isNewRecord = false;
    this.editedItem = null;
    this.items.pop();
  }

  addItem() {
    this.editedItem = new Item(null, this.id, '', false, 0);
    this.isNewRecord = true;
    this.items.push(this.editedItem);
  }

  createItem() {
    this.serv.createItem(this.editedItem).subscribe((data: Topic) => {
      this.editedItem.id = data.id;
      this.isNewRecord = false;
      this.editedItem = null;
    });
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
          this.topic.img = res[0].filename;
          this.isChanged = true;
          this.previewUrl = null;
          this.isImage = false;
        })
  }
}
