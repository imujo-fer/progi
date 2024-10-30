package com.progi.mockdata;

import com.progi.Model.Role;
import com.progi.Enum.RoleType;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class MockRole {
    public static List<Role> generateMockRoles() {
        List<Role> roles = new ArrayList<>();
        roles.add(new Role(1, RoleType.EMPLOYEE, new HashSet<>()));
        roles.add(new Role(2, RoleType.DEPARTMENT_HEAD, new HashSet<>()));
        return roles;
    }
}
