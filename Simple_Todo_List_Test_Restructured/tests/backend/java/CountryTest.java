package com.example.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
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

@ExtendWith(MockitoExtension.class)
public class CountryTest {

    private Country country;

    @Mock
    private List<State> mockStates;

    @BeforeEach
    void setUp() {
        country = new Country();
    }

    @Test
    void testCountryInitialization() {
        Assertions.assertNotNull(country, "Country object should not be null");
    }

    @Test
    void testSetAndGetId() {
        int expectedId = 1;
        country.setId(expectedId);
        Assertions.assertEquals(expectedId, country.getId(), "ID should match the set value");
    }

    @Test
    void testSetAndGetCode() {
        String expectedCode = "US";
        country.setCode(expectedCode);
        Assertions.assertEquals(expectedCode, country.getCode(), "Code should match the set value");
    }

    @Test
    void testSetAndGetName() {
        String expectedName = "United States";
        country.setName(expectedName);
        Assertions.assertEquals(expectedName, country.getName(), "Name should match the set value");
    }

    @Test
    void testSetAndGetStates() {
        List<State> expectedStates = new ArrayList<>();
        expectedStates.add(new State(1, "California", country));
        expectedStates.add(new State(2, "New York", country));

        country.setStates(expectedStates);
        Assertions.assertEquals(expectedStates, country.getStates(), "States list should match the set value");
    }

    @Test
    void testJsonIgnoreAnnotationOnStates() {
        try {
            java.lang.reflect.Field statesField = Country.class.getDeclaredField("states");
            JsonIgnore jsonIgnoreAnnotation = statesField.getAnnotation(JsonIgnore.class);
            Assertions.assertNotNull(jsonIgnoreAnnotation, "States field should have @JsonIgnore annotation");
        } catch (NoSuchFieldException e) {
            Assertions.fail("States field not found in Country class");
        }
    }

    @Test
    void testEqualsAndHashCode() {
        Country country1 = new Country();
        country1.setId(1);
        country1.setCode("US");
        country1.setName("United States");

        Country country2 = new Country();
        country2.setId(1);
        country2.setCode("US");
        country2.setName("United States");

        Assertions.assertEquals(country1, country2, "Equal countries should be equal");
        Assertions.assertEquals(country1.hashCode(), country2.hashCode(), "Equal countries should have the same hash code");
    }

    @Test
    void testToString() {
        country.setId(1);
        country.setCode("US");
        country.setName("United States");

        String expectedToString = "Country(id=1, code=US, name=United States, states=null)";
        Assertions.assertEquals(expectedToString, country.toString(), "toString() should return the expected string representation");
    }

    @Test
    void testNegativeIdSetting() {
        Assertions.assertThrows(IllegalArgumentException.class, () -> country.setId(-1),
                "Setting a negative ID should throw an IllegalArgumentException");
    }

    @Test
    void testEmptyCodeSetting() {
        Assertions.assertThrows(IllegalArgumentException.class, () -> country.setCode(""),
                "Setting an empty code should throw an IllegalArgumentException");
    }

    @Test
    void testNullNameSetting() {
        Assertions.assertThrows(NullPointerException.class, () -> country.setName(null),
                "Setting a null name should throw a NullPointerException");
    }
}