package com.app.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Hault;
import com.app.entities.Route;

@Repository
public interface IHaultRepo extends JpaRepository<Hault, Integer> {

	@Query("select distinct h from Hault h")
	List<Hault> findSourceHaults();

	@Query("select h.routeId from Hault h where station=?1")
	List<Route> findRoutes(String station);

	@Query("select h from Hault h where h.routeId in ?1")
	List<Hault> findDestinations(List<Route> srcRoutes);
	
	@Query("select h from Hault h where station=?1 ")
	List<Hault> findTopDistance(String source);
	
	@Query("select h.distance from Hault h where station=?1 and routeId=?2")
	int findDestDistance(String destination, Route routeId);

	List<Hault> findByStation(String station);

//	@Query(value = "select route_id from (select count(route_id) as cnt,route_id from haults where station in ?1 group by route_id) as p where p.cnt>1;", nativeQuery = true)
//	List<Route> findRoutesByStations(List<String> stationList);
	
	
	
}