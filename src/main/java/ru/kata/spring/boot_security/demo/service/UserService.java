package ru.kata.spring.boot_security.demo.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.jpa.UserRepository;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void add(User user) {
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void delete(Long id) {
        userRepository.deleteUserById(id);
    }

    @Transactional
    public void edit(User user) {
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User getUser(Long id) {
        return userRepository.findUserById(id).orElseThrow(RuntimeException::new);
    }

    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(RuntimeException::new);
    }
}
