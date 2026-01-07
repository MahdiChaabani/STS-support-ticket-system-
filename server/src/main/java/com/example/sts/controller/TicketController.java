package com.example.sts.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.sts.model.Ticket;
import com.example.sts.repository.TicketRepository;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    private final TicketRepository repo;

    public TicketController(TicketRepository repo) {
        this.repo = repo;
    }

    // List all tickets, optional status filter
    @GetMapping
    public List<Ticket> list(@RequestParam(name = "status", required = false) String status) {
        if (status == null || status.isBlank()) {
            return repo.findAll();
        }
        // simple filtering in-memory if repository doesn't have custom query
        return repo.findAll().stream().filter(t -> status.equalsIgnoreCase(t.getStatus())).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getById(@PathVariable String id) {
        Optional<Ticket> t = repo.findById(id);
        return t.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ticket> create(@RequestBody Ticket ticket) {
        // generate simple id if not provided
        if (ticket.getId() == null || ticket.getId().isBlank()) {
            ticket.setId("TK-" + System.currentTimeMillis());
        }
        if (ticket.getStatus() == null) ticket.setStatus("open");
        if (ticket.getReplies() == null) ticket.setReplies(0);
        if (ticket.getTime() == null) ticket.setTime("Just now");
        if (ticket.getRequester() == null || ticket.getRequester().isBlank()) {
            ticket.setRequester("unknown");
        }

        Ticket saved = repo.save(ticket);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> update(@PathVariable String id, @RequestBody Ticket ticket) {
        Optional<Ticket> existing = repo.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        Ticket e = existing.get();
        // update fields
        e.setTitle(ticket.getTitle());
        e.setDescription(ticket.getDescription());
        e.setCategory(ticket.getCategory());
        e.setStatus(ticket.getStatus());
        e.setPriority(ticket.getPriority());
        e.setAssignee(ticket.getAssignee());
        e.setReplies(ticket.getReplies());
        e.setTime(ticket.getTime());

        Ticket saved = repo.save(e);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
