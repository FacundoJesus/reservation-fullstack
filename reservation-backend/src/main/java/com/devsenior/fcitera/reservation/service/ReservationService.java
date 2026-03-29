package com.devsenior.fcitera.reservation.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsenior.fcitera.reservation.exception.BusinessRuleException;
import com.devsenior.fcitera.reservation.model.entity.Reservation;
import com.devsenior.fcitera.reservation.model.entity.ReservationStatus;
import com.devsenior.fcitera.reservation.repository.ReservationRepository;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @Transactional
    public Reservation createReservation(Reservation reservation) {
        if (reservation == null) {
            throw new BusinessRuleException("Reservation cannot be null");
        }

        if (reservation.getDate() == null || reservation.getTime() == null) {
            throw new BusinessRuleException("Reservation date and time are mandatory");
        }

        boolean exists = reservationRepository.existsByDateAndTime(reservation.getDate(), reservation.getTime());
        if (exists) {
            throw new BusinessRuleException("There is already a reservation at the same date and time");
        }

        reservation.setStatus(ReservationStatus.ACTIVE);
        return reservationRepository.save(reservation);
    }

    @Transactional
    public Reservation cancelReservation(Long id) {
        if (id == null) {
            throw new BusinessRuleException("Reservation id cannot be null");
        }

        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new BusinessRuleException("Reservation not found with id: " + id));

        if (ReservationStatus.CANCELED.equals(reservation.getStatus())) {
            throw new BusinessRuleException("Reservation already canceled");
        }

        reservation.setStatus(ReservationStatus.CANCELED);
        return reservationRepository.save(reservation);
    }

    @Transactional(readOnly = true)
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Reservation> findById(Long id) {
        return reservationRepository.findById(id);
    }
}
