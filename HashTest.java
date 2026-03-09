import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashTest {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String originalHash = "$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xdM0ttR7.y.F6Gky";
        System.out.println("Matches 'password': " + encoder.matches("password", originalHash));
        System.out.println("New Hash for 'password': " + encoder.encode("password"));
    }
}
