package com.example.sts.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sts.model.User;
import com.example.sts.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
        System.out.println("UserController initialized successfully!");
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            System.out.println("GET /api/users endpoint called");
            List<User> users = userRepo.findAll();
            System.out.println("Fetched " + users.size() + " users from database");

            // Print each user for debugging
            for (User user : users) {
                System.out.println("User: " + user.toString());
            }

            return ResponseEntity.ok(users);
        } catch (Exception e) {
            System.err.println("Error fetching users: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

    }


    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        System.out.println("GET /api/users/test endpoint called");
        return ResponseEntity.ok("UserController is working!");
    }
}