package com.simpletodo.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"http://localhost:3000"})
@RepositoryRestResource(collectionResourceRel = "states", path="states")
@Api(tags = "State", description = "Operations pertaining to states in the application")
public interface StateRepository extends JpaRepository<State, Integer> {
    
    @ApiOperation(value = "Find states by country code", response = List.class)
    List<State> findByCountryCode(@Param("code") String code);
}