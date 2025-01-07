package com.progi.department;



import com.progi.user.dto.UserDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

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

    @GetMapping("/employees/{id}")
    public ResponseEntity<List<UserDetailsDTO>> getEmployeesByDepartmentId(@PathVariable Integer id) {
        List<UserDetailsDTO> employees = departmentService.getEmployeesByDepartmentId(id);
        return ResponseEntity.ok(employees);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Integer id, @RequestParam String name) {
        Department updatedDepartment = departmentService.updateDepartmentName(id, name);
        return ResponseEntity.ok(updatedDepartment);
    }


    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody CreateDepartmentDTO createDepartmentDTO) {
        Department department = new Department();
        department.setName(createDepartmentDTO.getName());

        Department newDepartment = departmentService.createDepartment(department);

        return ResponseEntity.ok(newDepartment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Department> deleteDepartment(@PathVariable Integer id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployeeById(
            @RequestParam Integer departmentId,
            @PathVariable Integer id) {
        departmentService.deleteEmployeeFromDepartment(departmentId, id);
        return ResponseEntity.noContent().build();
    }

}
