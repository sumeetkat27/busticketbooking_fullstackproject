package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.HaultDTO;
import com.app.service.IHaultService;

@RestController
@RequestMapping("/hault")
@CrossOrigin(origins = "http://localhost:3000")
public class HaultController {

	@Autowired
	private IHaultService haultService;

	@PostMapping("/add")
	public ResponseEntity<?> addHaultDetails(@RequestBody @Valid HaultDTO hault) {
		return new ResponseEntity<>(haultService.addHault(hault), HttpStatus.ACCEPTED);
	}

	@GetMapping("/getsource")
	public ResponseEntity<?> getSourceHaults() {
		return new ResponseEntity<>(haultService.getSourceHault(), HttpStatus.OK);
	}

	@GetMapping("/getdest/{srcHault}")
	public ResponseEntity<?> getDestinationHaults(@PathVariable String srcHault) {
		return new ResponseEntity<>(haultService.getDestinations(srcHault), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteStation(@PathVariable int id){
		return ResponseEntity.ok(haultService.deleteHault(id));
	}
	
	@GetMapping("/get/{station}")
	public ResponseEntity<?> getDetailsByStation(@PathVariable String station){
		return new ResponseEntity<>(haultService.findDetailsByStation(station),HttpStatus.OK);
	}
}
