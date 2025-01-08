package com.progi.department;



import com.progi.user.dto.UserDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
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
        Department newDepartment = departmentService.createDepartment(createDepartmentDTO);
        return ResponseEntity.ok(newDepartment);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteDepartment(@PathVariable Integer id) {
        try {
            departmentService.deleteDepartment(id);
            return ResponseEntity.noContent().build();  // 204 if successful
        } catch (IllegalStateException e) {
            // Return 400 Bad Request with the error message as the response body
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());  // Send the error message directly
        }
    }



    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployeeById(
            @RequestParam Integer departmentId,
            @PathVariable Integer id) {
        departmentService.deleteEmployeeFromDepartment(departmentId, id);
        return ResponseEntity.noContent().build();
    }

}
