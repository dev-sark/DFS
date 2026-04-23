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
    public CommandLineRunner seedAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            boolean adminExists = userRepository.findByUsername("ADMIN").isPresent();

            if (!adminExists) {
                User admin = new User();
                admin.setUsername("ADMIN");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");
                admin.setApproval(true);
                userRepository.save(admin);
                System.out.println("====================================");
                System.out.println("✅ Default ADMIN created.");
                System.out.println("   Username : ADMIN");
                System.out.println("   Password : admin123");
                System.out.println("   Change your password after first login!");
                System.out.println("====================================");
            } else {
                System.out.println("✅ ADMIN account already exists — no changes made.");
            }
        };
    }
}
