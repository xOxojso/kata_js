package ru.kata.spring.boot_security.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.jpa.RoleRepository;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public void addRole(Role role) {
        Role find = roleRepository.findRoleByRole(role.getRole());
        roleRepository.save(role);
    }


    @Transactional(readOnly = true)
    public Role findByNameRole(String email) {
        return roleRepository.findRoleByRole(email);
    }

    @Transactional(readOnly = true)
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Role findByIdRole(Long id) {
        return roleRepository.getById(id);
    }

    @Transactional(readOnly = true)
    public Set<Role> findRoleByRoleIn(List<String> email) {
        return roleRepository.findRoleByRoleIn(email);
    }
}
