package ru.kata.spring.boot_security.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.details.UserDetailsImpl;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.jpa.UserRepository;

@Component
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userOne = userRepository.findUserByEmail(email).orElseThrow(RuntimeException::new);
        if (userOne == null) {
            throw new UsernameNotFoundException(email + " не найден");
        }
        return new UserDetailsImpl(userOne);
    }
}
