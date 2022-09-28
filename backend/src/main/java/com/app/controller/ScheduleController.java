package com.app.controller;

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

import com.app.dto.ScheduleDTO;
import com.app.service.IScheduleService;

@RestController
@RequestMapping("/schedule")
@CrossOrigin(origins = "http://localhost:3000")
public class ScheduleController {

	@Autowired
	private IScheduleService scheduleService;

	@PostMapping
	public ResponseEntity<?> addScheduleDetails(@RequestBody ScheduleDTO scheduleDto) {
		return new ResponseEntity<>(scheduleService.addSchedule(scheduleDto), HttpStatus.ACCEPTED);
	}

	@PostMapping("/get")
	public ResponseEntity<?> getScheduleDetails(@RequestBody ScheduleDTO schedule) {
		return new ResponseEntity<>(scheduleService.getSchedule(schedule), HttpStatus.ACCEPTED);
	}
	
//	@DeleteMapping("/cancel/{id}")
//	public ResponseEntity<?> deleteScheduleDetails(@PathVariable Integer id) {
//		return new ResponseEntity<>(scheduleService.deleteSchedule(id), HttpStatus.ACCEPTED);
//	}
	
	@PostMapping("/distance")
	public ResponseEntity<?> getDistance(@RequestBody ScheduleDTO schedule) {
		return new ResponseEntity<>(scheduleService.calculateDistance(schedule),HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/getfuture")
	public ResponseEntity<?> getFutureSchedules() {
		return new ResponseEntity<>(scheduleService.findSchedules(),HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> cancelSchedule(@PathVariable int id) {
		System.out.println(id);
		return new ResponseEntity<>(scheduleService.deleteSchedule(id),HttpStatus.OK);
	}
}
