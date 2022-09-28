package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor

@Entity
@Table(name = "buses")
public class Bus extends BaseEntity {

	@Column(unique = true, nullable = false)
	private int busNo;
	@Column(length = 50)
	private String busName;
	private int seatCapacity;
	@Enumerated(EnumType.STRING)
	@Column(name = "type", length = 15)
	private BusType type;
	@Enumerated(EnumType.STRING)
	@Column(name = "acType", length = 15)
	private AcType acType;

}
