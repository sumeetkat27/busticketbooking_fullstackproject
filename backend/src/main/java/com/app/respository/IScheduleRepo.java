package com.app.respository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Route;
import com.app.entities.Schedule;

@Repository
public interface IScheduleRepo extends JpaRepository<Schedule, Integer> {
	
	
	
	
	@Query("select s from Schedule s where  s.routeId in ?1 and startDate>=?2")
	Page<Schedule> getScheduledBuses(List<Route> routeList,LocalDate date,Pageable request);
	
	@Query("select s from Schedule s where startDate >= ?1")
	List<Schedule> findSchedulesByDate(LocalDate now);
	
	@Modifying
	@Query("update Schedule s set status='CANCELED' where id=?1")
	int cancelBus(int id);

}
