package com.example.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StateRepositoryTest {

    @Mock
    private StateRepository stateRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindByCountryCode() {
        // Arrange
        String countryCode = "US";
        State state1 = new State(1, "California", countryCode);
        State state2 = new State(2, "New York", countryCode);
        List<State> expectedStates = Arrays.asList(state1, state2);

        when(stateRepository.findByCountryCode(countryCode)).thenReturn(expectedStates);

        // Act
        List<State> actualStates = stateRepository.findByCountryCode(countryCode);

        // Assert
        assertEquals(expectedStates, actualStates);
        verify(stateRepository, times(1)).findByCountryCode(countryCode);
    }

    @Test
    void testFindByCountryCodeNoResults() {
        // Arrange
        String countryCode = "XX";
        List<State> expectedStates = Arrays.asList();

        when(stateRepository.findByCountryCode(countryCode)).thenReturn(expectedStates);

        // Act
        List<State> actualStates = stateRepository.findByCountryCode(countryCode);

        // Assert
        assertTrue(actualStates.isEmpty());
        verify(stateRepository, times(1)).findByCountryCode(countryCode);
    }

    // Mock implementation of State class
    private static class State {
        private int id;
        private String name;
        private String countryCode;

        public State(int id, String name, String countryCode) {
            this.id = id;
            this.name = name;
            this.countryCode = countryCode;
        }

        // Getters and setters
        public int getId() { return id; }
        public void setId(int id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getCountryCode() { return countryCode; }
        public void setCountryCode(String countryCode) { this.countryCode = countryCode; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            State state = (State) o;
            return id == state.id &&
                    name.equals(state.name) &&
                    countryCode.equals(state.countryCode);
        }
    }

    // Mock implementation of StateRepository interface
    private interface StateRepository extends JpaRepository<State, Integer> {
        List<State> findByCountryCode(@Param("code") String code);
    }
}