import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IPasswordUpdate } from '../../../../core/model/user/IPasswordUpdate.interface';
import { UserService } from '../../../../core/services/userService/user.service';
import { AuthService } from '../../../../core/services/authService/auth.service';

@Component({
  selector: 'app-update-pass-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-pass-form.component.html',
  styleUrl: './update-pass-form.component.css'
})
export class UpdatePassFormComponent {
  @Input() userId: string = '';
  @Output() save = new EventEmitter<IPasswordUpdate>();
  @Output() cancel = new EventEmitter<void>();

  passForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService) {
    this.passForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.passForm.valid && this.passForm.value.newPassword === this.passForm.value.repeatPassword) {
      this.save.emit({
        userId: this.userId,
        oldPassword: this.passForm.value.oldPassword,
        newPassword: this.passForm.value.newPassword
      });
      const data = {
        userId: this.userId,
        oldPassword: this.passForm.value.oldPassword,
        newPassword: this.passForm.value.newPassword
      };
      this.userService.updatePassword(this.userId, data).subscribe({
        next: (response) => {
          console.log('Password updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating password:', error);
        }
      });
    } else {
      this.passForm.get('repeatPassword')?.setErrors({ mismatch: true });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
