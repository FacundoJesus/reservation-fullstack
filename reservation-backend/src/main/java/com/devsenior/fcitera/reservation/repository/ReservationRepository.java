package com.devsenior.fcitera.reservation.repository;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsenior.fcitera.reservation.model.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    boolean existsByDateAndTime(LocalDate date, LocalTime time);
}
