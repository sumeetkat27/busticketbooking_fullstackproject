package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BusDTO;
import com.app.entities.Bus;
import com.app.service.IBusService;

@RestController
@RequestMapping("/bus")
@CrossOrigin(origins = "http://localhost:3000")
public class BusController {

	@Autowired
	private IBusService busService;

	@PostMapping("/add")
	public ResponseEntity<?> addBusDetails(@RequestBody @Valid BusDTO bus,BindingResult br) {
		System.out.println(" in controller "+bus );
		if(br.hasFieldErrors()) {
			throw new RuntimeException("Invalid input");
		}
		Bus addedBus = busService.saveBus(bus);
		return new ResponseEntity<>(addedBus, HttpStatus.ACCEPTED);
	}

	@GetMapping("/get/{busNo}")
	public ResponseEntity<?> getBus(@PathVariable int busNo) {
		Bus bus = busService.getBusDetails(busNo);
		if (bus == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(bus, HttpStatus.OK);
	}

	@GetMapping("/getall")
	public ResponseEntity<?> getAllBuses() {
		List<Bus> busList = busService.getAllBusDetails();
		if (busList == null)
			return new ResponseEntity<>("No Buses Are Added", HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(busList, HttpStatus.OK);
	}

}
