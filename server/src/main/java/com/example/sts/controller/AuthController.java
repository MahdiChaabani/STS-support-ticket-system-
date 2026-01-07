package com.example.sts.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sts.model.User;
import com.example.sts.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepo;

    public AuthController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "email and password required"));
        }
        // default role to 'user' when not provided
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("user");
        }

        if (userRepo.existsByEmail(user.getEmail()) || (user.getUsername() != null && userRepo.existsByUsername(user.getUsername()))) {
            return ResponseEntity.status(409).body(Map.of("error", "User already exists"));
        }
        User saved = userRepo.save(user);
        // log for debugging
        System.out.println("[AuthController] Saved user id=" + saved.getId() + " email=" + saved.getEmail());
        saved.setPassword(null);
        return ResponseEntity.status(201).body(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String identifier = body.getOrDefault("identifier", "").trim();
        String password = body.getOrDefault("password", "");
        if (identifier.isBlank() || password.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "identifier and password required"));
        }
        Optional<User> u = userRepo.findByEmail(identifier);
        if (u.isEmpty()) {
            u = userRepo.findByUsername(identifier);
        }
        if (u.isEmpty()) return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        User user = u.get();
        if (!password.equals(user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
        user.setPassword(null);
        return ResponseEntity.ok(Map.of("user", user));
    }
    @GetMapping("/test")
    public String test() {
        return "AuthController is alive";
    }
    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/db-info")
    public ResponseEntity<String> dbInfo() {
        return ResponseEntity.ok("MongoDB Database: " + mongoTemplate.getDb().getName());
}

    @GetMapping("/users")
    public ResponseEntity<?> listUsers() {
        var users = userRepo.findAll();
        // hide passwords before returning
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }

    @GetMapping("/collections")
    public ResponseEntity<?> listCollections() {
        var namesIterable = mongoTemplate.getDb().listCollectionNames();
        java.util.Map<String, Long> counts = new java.util.LinkedHashMap<>();
        for (String name : namesIterable) {
            long count = mongoTemplate.getDb().getCollection(name).countDocuments();
            counts.put(name, count);
        }
        return ResponseEntity.ok(counts);
    }


}
