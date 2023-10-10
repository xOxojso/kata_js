package ru.kata.spring.boot_security.demo.Util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class UtilDB {
    private final RoleService roleService;
    private final UserService userService;

    @PostConstruct
    public void utilDB() {
        Set<Role> roleAdmin = new HashSet<>();
        Set<Role> roleUser = new HashSet<>();
        Role role1 = new Role("ROLE_ADMIN");
        Role role2 = new Role("ROLE_USER");
        roleService.addRole(role1);
        roleService.addRole(role2);
        roleAdmin.add(role1);
        roleAdmin.add(role2);
        roleUser.add(role2);
        User user1 = new User()
                .toBuilder()
                .username("admin")
                .age(30)
                .email("admin@email.ru")
                .password("admin")
                .roles(roleAdmin)
                .build();
        User user2 = new User()
                .toBuilder()
                .username("user")
                .age(20)
                .email("user@email.ru")
                .password("user")
                .roles(roleUser)
                .build();
        userService.add(user1);
        userService.add(user2);
    }
}
