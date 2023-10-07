package ru.kata.spring.boot_security.demo.jpa;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.entity.Role;

import java.util.Collection;
import java.util.Set;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findRoleByRole(String roleName);

    Set<Role> findRoleByRoleIn(Collection<String> roleName);
}
