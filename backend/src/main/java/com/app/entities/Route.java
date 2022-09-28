package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString

@Entity
@Table(name = "routes", uniqueConstraints = @UniqueConstraint(columnNames = { "src", "dest" }))
public class Route extends BaseEntity{

	@Column(length = 50)
	private String src;
	@Column(length = 50)
	private String dest;
	private int pricePerKm;

}