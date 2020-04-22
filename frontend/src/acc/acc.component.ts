import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/reg/must-match.validator';
import { Router } from '@angular/router';
import { AccService } from './acc.service';
import { Profile } from './profile';
import { Group } from './group';

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.css']
})
export class AccComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;

  id: number;
  role: number;
  groups: Array<Group>;

  constructor(
    private formBuilder: FormBuilder,
    private serv: AccService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.role = 1;
    this.registerForm = this.formBuilder.group({
      fio: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.minLength(6)],
      confirm: [''],
      mail: ['', [Validators.required, Validators.email]],
      group: ['']
      }, {
        validator: MustMatch('password', 'confirm')
      }
    );
    this.loadGroups();
  }

  get f() { return this.registerForm.controls; }

  private groupNameById(id: number) {
    return this.groups.filter((g: Group) => { return g.id == id; })[0]?.name;
  }

  private groupIdByName(name: string) {
    return this.groups.filter((g: Group) => { return g.name == name; })[0]?.id;
  }

  private loadProfile() {
    this.serv.getProfile().subscribe((data: Profile) => {
      this.id = data.id;
      this.role = data.roleId;
      this.f.fio.setValue(data.fio);
      this.f.username.setValue(data.username);
      this.f.mail.setValue(data.email);
      if (data.group_id) {
        this.f.group.setValue(this.groupNameById(data.group_id));
      }
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  private loadGroups() {
    this.serv.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
      this.loadProfile();
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  submit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.router.navigate(['profile']);
      return;
    }
    this.serv.changeProfile(this.registerForm.value, this.groupIdByName(this.registerForm.value.group)).subscribe(
      (data: any) => {
        alert("Изменения сохранены");
        this.router.navigate(['']);
      },
      (error: any) => {
        let status = error.status;
        alert("Error: " + status);
      });
  }
}
