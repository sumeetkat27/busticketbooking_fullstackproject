package com.app.service;

import java.util.HashSet;
import java.util.List;

import com.app.dto.HaultDTO;
import com.app.entities.Hault;


public interface IHaultService {

	Hault addHault(HaultDTO hault);

	HashSet<String> getSourceHault();

	HashSet<String> getDestinations(String srcHault);

	String deleteHault(int id);

	List<Hault> findDetailsByStation(String station);
}
