import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Group } from '../acc/group';
import { GroupsService } from './groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  providers: [GroupsService],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

  editedGroup: Group;
  groups: Array<Group>;
  isNewRecord: boolean;

  constructor(
    private serv: GroupsService,
    private router: Router
  ) {
    this.groups = new Array<Group>();
    this.isNewRecord = false;
    this.editedGroup = null;
  }

  ngOnInit(): void {
    this.loadGroups();
  }

  loadTemplate(group: Group) {
    if (this.editedGroup && this.editedGroup.id == group.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  private loadGroups() {
    this.serv.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  addGroup() {
    this.editedGroup = new Group(null, '', new Date());
    this.groups.push(this.editedGroup);
    this.isNewRecord = true;
  }  

  editGroup(group: Group) {
    this.editedGroup = new Group(group.id, group.name, group.created);
  }

  cancel() {
    if (this.isNewRecord) {
      this.groups.pop();
      this.isNewRecord = false
    }
    this.editedGroup = null;
  }

  saveGroup() {
    if (this.isNewRecord) {
      this.serv.createGroup(this.editedGroup).subscribe(data => {
        this.loadGroups();
      });
      this.isNewRecord = false
      this.editedGroup = null;
    } else {
      this.serv
        .updateGroup(this.editedGroup.id, this.editedGroup)
        .subscribe(data => {
          this.loadGroups();
        });
      this.editedGroup = null;
    }
  }

  deleteGroup(group: Group) {
    if (confirm("Удалить группу?")) {
      this.serv.deleteGroup(group.id).subscribe(data => {
          setTimeout(() => this.loadGroups(), 1000);
      });
    }
  }
}
