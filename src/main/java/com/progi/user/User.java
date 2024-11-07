package com.progi.user;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.progi.Enum.RoleType;
import com.progi.department.Department;
import com.progi.role.Role;
import com.progi.trip.Trip;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(requiredProperties = {"id"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    @NotNull
    private String email;

    @Column(nullable = false)
    @NotNull
    private String firstName;

    @Column(nullable = false)
    @NotNull
    private String lastName;

    @Column(nullable = false)
    @NotNull
    private String iban;

    @Column(nullable = false, unique = true)
    @NotNull
    private String registrationHash;

    @Column
    private String provider;

    @Column
    private String providerId;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    @JsonBackReference
    @NotNull
    private Department department;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    @NotNull
    private List<Role> roles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Trip> trips;

    public boolean isUserDepartmentHead () {
        List<User> departmentHeads =  department.getUsers().stream()
                .filter(user -> user.getRoles().stream().anyMatch(role -> role.getRoleType().equals(RoleType.DEPARTMENT_HEAD)))
                .toList();

        return departmentHeads.contains(this);
    }

    public boolean hasRegistered() {
        return provider != null
            && !provider.isBlank()
            && providerId != null
            && !providerId.isBlank();

    }


    public boolean isUserDepartmentHead() {
        this.roles.stream().forEach(System.out::println);
        return this.roles.stream().anyMatch(role -> role.getRoleType().equals(RoleType.DEPARTMENT_HEAD));
    }

    public boolean isUserDepartmentHead(Department targetDepartment) {

        if (targetDepartment == null) return false;

        boolean isUserInDepartment = this.department.getId() == targetDepartment.getId();
        boolean isUserDepartmentHead = this.isUserDepartmentHead(); 

        return isUserInDepartment && isUserDepartmentHead;
    }

    public boolean isUserAdmin() {
        return this.roles.stream().anyMatch(role -> role.getRoleType().equals("ADMIN"));
    }

    public boolean isUserAccountant(){
        return this.roles.stream().anyMatch(role -> role.getRoleType().equals(RoleType.ACCOUNTANT));
    }

    public boolean isUserDirector(){
        return this.roles.stream().anyMatch(role -> role.getRoleType().equals(RoleType.DIRECTOR));
    }
    
}
