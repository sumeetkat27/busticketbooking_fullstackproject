package com.app.service;

import java.util.List;

import com.app.dto.ScheduleDTO;
import com.app.entities.Schedule;

public interface IScheduleService {

	Schedule addSchedule(ScheduleDTO scheduleDto);

	List<Schedule> getSchedule(ScheduleDTO schedule);

	String deleteSchedule(int id);

	Integer calculateDistance(ScheduleDTO schedule);

	List<Schedule> findSchedules();

}
