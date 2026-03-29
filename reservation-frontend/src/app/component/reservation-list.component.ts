import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { Reservation } from '../model/reservation.model';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationListComponent {
  private readonly reservationService = inject(ReservationService);
  readonly reservations = signal<Reservation[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly totalReservations = computed(() => this.reservations().length);

  constructor() {
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading.set(true);
    this.error.set(null);

    this.reservationService.getAll().subscribe({
      next: (reservations) => this.reservations.set(reservations),
      error: () => this.error.set('No se pudieron cargar las reservas.'),
      complete: () => this.loading.set(false)
    });
  }

  cancelReservation(id: number): void {
    this.reservationService.cancel(id).subscribe({
      next: () => {
        this.reservations.update((list) => list.filter((reservation) => reservation.id !== id));
      },
      error: () => this.error.set('No se pudo cancelar la reserva.')
    });
  }

  trackByReservation(_: number, reservation: Reservation): number {
    return reservation.id;
  }
}
