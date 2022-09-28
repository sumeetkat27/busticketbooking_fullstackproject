package com.app.service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.HaultDTO;
import com.app.entities.Hault;
import com.app.entities.Route;
import com.app.respository.IHaultRepo;
import com.app.respository.IRouteRepo;

@Service
@Transactional
public class HaultServiceImpl implements IHaultService {

	@Autowired
	private IHaultRepo haultRepo;

	@Autowired
	private IRouteRepo routeRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public Hault addHault(HaultDTO haultDto) {
		Route route = routeRepo.findById(haultDto.getRouteId())
				.orElseThrow(() -> new RuntimeException("Route is not valid"));
		Hault hault = mapper.map(haultDto, Hault.class);
		hault.setRouteId(route);
		return haultRepo.save(hault);
	}

	@Override
	public HashSet<String> getSourceHault() {

		return haultRepo.findSourceHaults().stream().map(x -> x.getStation())
				.collect(Collectors.toCollection(HashSet::new));
	}

	@Override
	public HashSet<String> getDestinations(String srcHault) {
		List<Route> srcRoutes = haultRepo.findRoutes(srcHault);
		HashSet<String> destinationSet = haultRepo.findDestinations(srcRoutes).stream().map(x -> x.getStation()).filter(x -> !x.equals(srcHault))
				.collect(Collectors.toCollection(HashSet::new));
		
		return destinationSet;
	}

	@Override
	public String deleteHault(int id) {
	//	System.out.println(id);
		haultRepo.deleteById(id);
		return "Deleted Successfully";
	}

	@Override
	public List<Hault> findDetailsByStation(String station) {
		return haultRepo.findByStation(station);
	}

}