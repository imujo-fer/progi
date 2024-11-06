package com.progi.role;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.progi.Enum.RoleType;
import com.progi.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private RoleType name;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<User> users;

    public Role(Integer id, RoleType name, List<User> users) {
        this.id = id;
        this.name = name;
        this.users = users;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public @NotNull RoleType getName() {
        return name;
    }

    public void setName(@NotNull RoleType name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
