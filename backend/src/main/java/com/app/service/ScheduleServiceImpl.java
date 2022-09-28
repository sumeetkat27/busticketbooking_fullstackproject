package com.app.service;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.app.dto.ScheduleDTO;
import com.app.entities.Bus;
import com.app.entities.Hault;
import com.app.entities.Route;
import com.app.entities.Schedule;
import com.app.respository.IBusRepo;
import com.app.respository.IHaultRepo;
import com.app.respository.IRouteRepo;
import com.app.respository.IScheduleRepo;

import lombok.extern.slf4j.Slf4j;

@Slf4j

@Service
@Transactional
public class ScheduleServiceImpl implements IScheduleService {

	@Autowired
	private IScheduleRepo scheduleRepo;

	@Autowired
	private IRouteRepo routeRepo;

	@Autowired
	private IBusRepo busRepo;

	@Autowired
	private IHaultRepo haultRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public Schedule addSchedule(ScheduleDTO scheduleDto) {
		Route route = routeRepo.findById(scheduleDto.getRouteId())
				.orElseThrow(() -> new RuntimeException("Please Add Route First"));
		System.out.println(scheduleDto.getStartDate());

		Bus bus = busRepo.findByBusNo(scheduleDto.getBusNo());
		if(bus == null) {
			throw new RuntimeException("Bus is not added with this number");
		}
		Schedule schedule = mapper.map(scheduleDto, Schedule.class);
		schedule.setBusId(bus);
		schedule.setRouteId(route);
		return scheduleRepo.save(schedule);
	}

	@Override
	public List<Schedule> getSchedule(ScheduleDTO schedule) {
		List<Route> sourceList = haultRepo.findRoutes(schedule.getSource());
		List<Route> destList = haultRepo.findRoutes(schedule.getDestination());
		sourceList.retainAll(destList);
		String property = "startDate";
		int pageSize = 10;
		Pageable request = PageRequest.of(schedule.getPageNo(), pageSize, Direction.ASC, property);
		Page<Schedule> scheduledBuses = scheduleRepo.getScheduledBuses(sourceList, schedule.getDate(), request);
		return scheduledBuses.getContent();
	}

	@Override
	public String deleteSchedule(int scheduleId) {
		System.out.println(scheduleId);
		int res = scheduleRepo.cancelBus(scheduleId);
		System.out.println(res);
		return "Bus Canceled";
	}

	@Override
	public Integer calculateDistance(ScheduleDTO schedule) {
		log.info(schedule.toString());
		Hault hault = haultRepo.findTopDistance(schedule.getSource()).get(0);
		int srcDistance = hault.getDistance();
		log.info(Integer.toString(srcDistance));
		int distance = Math
				.abs(srcDistance - (haultRepo.findDestDistance(schedule.getDestination(), hault.getRouteId())));
		log.info(Integer.toString(distance));
		return distance;
	}

	@Override
	public List<Schedule> findSchedules() {

		return scheduleRepo.findSchedulesByDate(LocalDate.now());
	}

}
