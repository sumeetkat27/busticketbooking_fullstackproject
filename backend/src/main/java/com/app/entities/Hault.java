package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(name = "haults",uniqueConstraints = @UniqueConstraint(columnNames = { "station","route_id" }))
public class Hault extends BaseEntity {

	@Column(length = 80)
	private String station;
	@ManyToOne
	@JoinColumn(name = "route_id")
	private Route routeId;
	private int distance;
}
