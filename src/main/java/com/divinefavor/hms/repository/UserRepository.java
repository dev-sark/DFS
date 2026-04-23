package com.divinefavor.hms.repository;

import com.divinefavor.hms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameIgnoreCase(String username);
    
    default Optional<User> findByUsername(String username) {
        return findByUsernameIgnoreCase(username);
    }
}
