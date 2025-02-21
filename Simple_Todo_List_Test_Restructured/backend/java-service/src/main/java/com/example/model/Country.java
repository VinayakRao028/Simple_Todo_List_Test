package com.victorgarciarubio.ecommerce.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Entity
@Table(name = "country")
@Data
@Slf4j
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "country")
    @JsonIgnore // Ignore in response json
    private List<State> states;

    public Country() {
        log.debug("Creating new Country instance");
    }

    // You might want to add a custom toString method to avoid potential circular references
    @Override
    public String toString() {
        return "Country{" +
               "id=" + id +
               ", code='" + code + '\'' +
               ", name='" + name + '\'' +
               ", statesCount=" + (states != null ? states.size() : 0) +
               '}';
    }
}