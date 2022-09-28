package com.app.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Bus;

@Repository
public interface IBusRepo extends JpaRepository<Bus, Integer> {

	boolean existsByBusNo(int busNo);

	Bus findByBusNo(int busNo);

}
