package com.divinefavor.hms;

import com.divinefavor.hms.model.User;
import com.divinefavor.hms.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class HmsApplication {
    public static void main(String[] args) {
        SpringApplication.run(HmsApplication.class, args);
    }

    @Bean
    public CommandLineRunner resetPasswords(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            for (User user : userRepository.findAll()) {
                user.setPassword(passwordEncoder.encode("password"));
                userRepository.save(user);
            }
            System.out.println("✅ All user passwords have been reliably reset to 'password'");
        };
    }
}
