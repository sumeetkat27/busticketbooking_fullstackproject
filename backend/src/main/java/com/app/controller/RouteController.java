package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.RouteDTO;
import com.app.service.IRouteService;

@RestController
@RequestMapping("/route")
@CrossOrigin(origins = "http://localhost:3000")
public class RouteController {

	@Autowired
	private IRouteService routeService;

	@PostMapping("/add")
	public ResponseEntity<?> addRoute(@RequestBody @Valid RouteDTO route, BindingResult br) {
		System.out.println(br + " in route controller  " + route);
		return new ResponseEntity<>(routeService.addRoute(route), HttpStatus.ACCEPTED);
	}

	@GetMapping("/getall")
	public ResponseEntity<?> getAllRouteDetails() {
		return new ResponseEntity<>(routeService.findAllRouteDetails(), HttpStatus.OK);
	}

	@PostMapping("/updateprice")
	public ResponseEntity<?> updatePrice(@RequestBody RouteDTO routeDto) {
		if (routeService.updateRoutePrice(routeDto)) {
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteRouteDetails(@PathVariable int id){
		return ResponseEntity.ok(routeService.deleteRouteById(id));
	}

}
