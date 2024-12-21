package com.progi.department;


import com.progi.user.User;
import com.progi.user.dto.UserDetailsDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    // Get /api/departments/{id}
    @GetMapping("{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Integer id) {
        Department department = departmentService.getDepartmentById(id);
        return ResponseEntity.ok(department);
    }

    @GetMapping
    public ResponseEntity<List<DepartmentDTO>> getAllDepartments() {
        List<DepartmentDTO> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    // GET /api/departments/{id}/employees
    @GetMapping("{id}/employees")
    public ResponseEntity<List<UserDetailsDTO>> getEmployeesByDepartmentId(@PathVariable Integer id) {
        List<UserDetailsDTO> employees = departmentService.getEmployeesByDepartmentId(id);
        return ResponseEntity.ok(employees);
    }

    // Post /api/departments
    @PostMapping
    public ResponseEntity<Department> createDepartment(@Valid @RequestBody Department department) {
        Department newDepartment = departmentService.createDepartment(department);
        return ResponseEntity.ok(newDepartment);
    }

    // Patch /api/departments/{id}
    @PatchMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Integer id, @RequestBody Department updateDepartment) {
        Department department = departmentService.updateDepartment(id, updateDepartment);
        return ResponseEntity.ok(department);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Department> deleteDepartment(@PathVariable Integer id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }

    // DELETE /api/employees/{id}
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployeeById(@PathVariable Integer id) {
        // Call the service to handle the deletion
        departmentService.deleteEmployeeById(id);
        // Return a no-content response
        return ResponseEntity.noContent().build();
    }

}
