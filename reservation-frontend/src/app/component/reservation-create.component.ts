import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Reservation, ReservationStatus } from '../model/reservation.model';
import { ReservationService } from '../service/reservation.service';

interface ReservationFormValue {
  nombreCliente: string;
  fecha: string;
  hora: string;
  servicio: string;
}

@Component({
  selector: 'app-reservation-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly reservationService = inject(ReservationService);
  private readonly router = inject(Router);

  readonly serviceOptions = [ 
    'Soporte de hardware',
    'Instalación de software',
    'Limpieza de virus',
    'Recuperación de datos',
    'Asesoría tecnológica',
    'Mantenimiento preventivo',
    'Actualización de sistemas',
    'Configuración de redes',
    'Asistencia remota',
    'Capacitación tecnológica'
  ];

  readonly form = this.fb.group({
    nombreCliente: ['', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    servicio: ['', Validators.required]
  });

  readonly saveError = signal<string | null>(null);
  readonly isSubmitting = signal(false);

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value as ReservationFormValue;
    const payload: Omit<Reservation, 'id'> = {
      customerName: value.nombreCliente,
      date: value.fecha,
      time: value.hora,
      service: value.servicio,
      status: ReservationStatus.ACTIVE
    };

    this.isSubmitting.set(true);
    this.saveError.set(null);

    this.reservationService.create(payload).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitting.set(false);
        this.router.navigateByUrl('/reservas');
      },
      error: (error) => {
        console.log("ERROR COMPLETO:", error);
      
        let mensaje = 'No se pudo guardar la reserva.';
      
        if (typeof error.error === 'string') {
          mensaje = error.error;
        } else if (error.error?.message) {
          mensaje = error.error.message;
        }
      
        this.saveError.set(mensaje);
        this.isSubmitting.set(false);
      }
      
    });
  }
}
