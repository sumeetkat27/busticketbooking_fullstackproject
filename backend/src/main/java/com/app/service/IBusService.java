package com.app.service;

import java.util.List;

import com.app.dto.BusDTO;
import com.app.entities.Bus;


public interface IBusService {
	
	Bus saveBus(BusDTO busDto);

	Bus getBusDetails(int busNo);

	List<Bus> getAllBusDetails();

}
