package com.app.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Route;

@Repository
public interface IRouteRepo extends JpaRepository<Route, Integer> {
	
	@Modifying
	@Query("update Route set pricePerKm=?2 where id=?1")
	int update(Integer id, int price);

}
