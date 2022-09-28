package com.app.respository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Booking;
import com.app.entities.Schedule;
import com.app.entities.User;

@Repository
public interface IBookingRepo extends JpaRepository<Booking, Integer> {

	List<Booking> findByScheduleId(Schedule schedule);
	
	Page<Booking> findByUserId(User user, Pageable request);
	
	@Query("Select b from Booking b join fetch b.scheduleId a where a.startDate between ?1 and ?2")
	List<Booking> findByDate(LocalDate fromDate, LocalDate toDate);
	
	
}
