package com.progi.user;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.progi.department.Department;
import com.progi.role.Role;
import com.progi.trip.Trip;

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
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
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

    @Column(nullable = false)
    @NotNull
    private String passwordHash;

    @Column(nullable = false)
    @NotNull
    private String registrationHash;

    @Column(nullable = false)
    @NotNull
    private boolean hasRegistered;

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
    @NotNull
    private List<Trip> trips;

    public User(Integer id, String email, String firstName, String lastName, String iban, String passwordHash, String registrationHash, boolean hasRegistered, Department department, List<Role> roles, List<Trip> trips) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.iban = iban;
        this.passwordHash = passwordHash;
        this.registrationHash = registrationHash;
        this.hasRegistered = hasRegistered;
        this.department = department;
        this.roles = roles;
        this.trips = trips;
    }

    public User(){};

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public @NotNull String getEmail() {
        return email;
    }

    public void setEmail(@NotNull String email) {
        this.email = email;
    }

    public @NotNull String getFirstName() {
        return firstName;
    }

    public void setFirstName(@NotNull String firstName) {
        this.firstName = firstName;
    }

    public @NotNull String getLastName() {
        return lastName;
    }

    public void setLastName(@NotNull String lastName) {
        this.lastName = lastName;
    }

    public @NotNull String getIban() {
        return iban;
    }

    public void setIban(@NotNull String iban) {
        this.iban = iban;
    }

    public @NotNull String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(@NotNull String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public @NotNull String getRegistrationHash() {
        return registrationHash;
    }

    public void setRegistrationHash(@NotNull String registrationHash) {
        this.registrationHash = registrationHash;
    }

    @NotNull
    public boolean isHasRegistered() {
        return hasRegistered;
    }

    public void setHasRegistered(@NotNull boolean hasRegistered) {
        this.hasRegistered = hasRegistered;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<Trip> getTrips() {
        return trips;
    }

    public void setTrips(List<Trip> trips) {
        this.trips = trips;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }
}
