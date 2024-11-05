package com.progi.mockdata;

import com.progi.Model.Role;
import com.progi.Model.Trip;
import com.progi.Model.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MockUser {
    public static List<User> generateMockUsers() {
        List<User> users = new ArrayList<>();
        users.add(new User(1, "user1@example.com", "John", "Doe", "HR1234567890", "passwordHash1", "regHash1", true, null, null, new ArrayList<Trip>()));
        users.add(new User(2, "user2@example.com", "Jane", "Alde", "HR0987654321", "passwordHash2", "regHash2", true, null,  null, new ArrayList<Trip>()));
        return users;
    }
}
