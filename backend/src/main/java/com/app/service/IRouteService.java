package com.app.service;

import java.util.List;

import com.app.dto.RouteDTO;
import com.app.entities.Route;

public interface IRouteService {
	
	RouteDTO addRoute(RouteDTO routeDto);

	List<Route> findAllRouteDetails();

	boolean updateRoutePrice(RouteDTO routeDto);

	String deleteRouteById(int id);

}
