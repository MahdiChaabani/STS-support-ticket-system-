package com.example.sts.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.sts.model.Ticket;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {
    // add custom query methods if needed, e.g.
    // List<Ticket> findByStatus(String status);
}
