package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_excs.BusHandlingException;
import com.app.dto.BusDTO;
import com.app.entities.Bus;
import com.app.respository.IBusRepo;

@Transactional
@Service
public class BusServiceImpl implements IBusService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IBusRepo busRepo;

	@Override
	public Bus saveBus(BusDTO busDto) {
		Bus bus = mapper.map(busDto, Bus.class);
		System.out.println(" in service " + bus);

		if (busRepo.existsByBusNo(bus.getBusNo())) {
			throw new BusHandlingException("Bus No Already Assigned");
		}

		Bus persistBus = busRepo.save(bus);
		System.out.println(persistBus);

		if (persistBus == null) {
			throw new BusHandlingException("Could Not save Details");
		}

		return persistBus;
	}

	@Override
	public Bus getBusDetails(int busNo) {

		return busRepo.findByBusNo(busNo);

	}

	@Override
	public List<Bus> getAllBusDetails() {

		return busRepo.findAll();
	}

}
