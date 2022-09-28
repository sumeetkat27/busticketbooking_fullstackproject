package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_excs.RouteHandlingException;
import com.app.dto.RouteDTO;
import com.app.entities.Route;
import com.app.respository.IRouteRepo;

@Service
@Transactional
public class RouteServiceImpl implements IRouteService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IRouteRepo routeRepo;

	@Override
	public RouteDTO addRoute(RouteDTO routeDto) {
		Route route = mapper.map(routeDto, Route.class);
		Route persistRoute = routeRepo.save(route);
		if (persistRoute == null) {
			throw new RouteHandlingException("Route could not be added");
		}
		return mapper.map(persistRoute, RouteDTO.class);
	}

	@Override
	public List<Route> findAllRouteDetails() {
		List<Route> routeList = routeRepo.findAll();
		if (routeList.isEmpty()) {
			throw new RouteHandlingException("Please Add Route First");
		}
		return routeList;
	}

	@Override
	public boolean updateRoutePrice(RouteDTO routeDto) {
		
		if (routeRepo.update(routeDto.getId(), routeDto.getPricePerKm()) == 1) {
			
			return true;
		}
		return false;
	}

	@Override
	public String deleteRouteById(int id) {
		routeRepo.deleteById(id);
		return "Route Deleted Successfully";
	}

}
