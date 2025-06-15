import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/userService/user.service';
import { AuthService } from '../../../../core/services/authService/auth.service';
import { IAddressUser } from '../../../../core/model/user/IAddressUser.interface';

@Component({
  selector: 'app-addresses-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './addresses-form.component.html',
  styleUrl: './addresses-form.component.css',
})
export class AddressesFormComponent {

  /**
   * Componente para el formulario de direcciones.
   * Permite al usuario ingresar y guardar una dirección.
   * Utiliza Reactive Forms para la validación y manejo de datos.
   */
  @Input() address: any;
  @Output() save = new EventEmitter<IAddressUser>();
  @Output() cancel = new EventEmitter<void>();

  addressForm: FormGroup;

  streetTypes: string[] = [
    'Calle',
    'Avenida',
    'Plaza',
    'Camino',
    'Carretera',
    'Paseo',
    'Ronda',
    'Travesía',
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      streetType: ['', Validators.required],
      streetName: ['', Validators.required],
      streetNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      portal: [''],
      letter: [''],
      buildingName: [''],
      stair: [''],
      floor: [''],
      door: [''],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      isDefault: [false],
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const streetValue = {
        ...this.formatAddress(this.addressForm.value),
        street: this.buildStreetString(),
      };

      //obtener el token
      const userId = this.authService.getUserIdFromToken();
      if (!userId) {
        console.error('userId no encontrado');
        return;
      }

      // enviar datos al servicio de usuario
      this.userService.updateAddress(userId, [streetValue]).subscribe({
        next: (response) => {
          console.log('Dirección guardada correctamente:', response);
          this.save.emit(streetValue);
          this.addressForm.reset();
        },
        error: (error) => {
          console.error('Error al guardar la dirección:', error);
          // Aquí puedes manejar el error si es necesario
        },
      });
    }
  }

  onCancel() {
    this.cancel.emit();
    this.addressForm.reset();
  }



  private buildStreetString(): string {
    const v = this.addressForm.value;
    if (!v.streetType || !v.streetName || !v.streetNumber || !v.postalCode) {
      console.error('Faltan campos obligatorios');
      return '';
    }
    return (
      `${v.streetType} ${v.streetName}, Nº ${v.streetNumber}` +
      (v.portal ? `, Portal ${v.portal}` : '') +
      (v.letter ? `, Letra ${v.letter}` : '') +
      (v.buildingName ? `, Edificio ${v.buildingName}` : '') +
      (v.stair ? `, Escalera ${v.stair}` : '') +
      (v.floor ? `, Piso ${v.floor}` : '') +
      (v.door ? `, Puerta ${v.door}` : '')
    );
  }

  private formatAddress(address: IAddressUser): IAddressUser {
    return {
      addressId: this.address?.addressId || 'new', // Si es una edición, se mantiene el ID
      userId: this.authService.getUserIdFromToken(),
      country: address.country,
      city: address.city,
      street: this.buildStreetString(),
      postalCode: address.postalCode,
      isDefault: address.isDefault || false,

    };
  }


}
