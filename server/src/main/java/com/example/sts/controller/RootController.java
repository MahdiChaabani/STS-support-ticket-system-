package com.example.sts.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class RootController {

    @GetMapping("/")
    public RedirectView root() {
        return new RedirectView("/api/tickets");
    }

    @GetMapping("/error")
    public ResponseEntity<String> error() {
        return ResponseEntity.status(404).body("Not Found");
    }
}
