import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fio: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]]
      }, {
        validator: MustMatch('password', 'confirm')
      }
    );
  }

  get f() { return this.registerForm.controls; }

  submit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    alert(JSON.stringify(this.registerForm.value));
  }

}
