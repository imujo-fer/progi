package com.progi.mockdata;

import com.progi.Model.Department;
import com.progi.Model.User;

import java.util.ArrayList;
import java.util.List;

public class MockDepartment {
    public static List<Department> generateMockDepartments() {
        List<Department> departments = new ArrayList<>();
        departments.add(new Department(1, "IT", new ArrayList<User>()));
        departments.add(new Department(2, "HR", new ArrayList<User>()));
        departments.add(new Department(3, "Finance", new ArrayList<User>()));
        return departments;
    }
}
