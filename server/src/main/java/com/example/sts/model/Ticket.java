package com.example.sts.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "tickets")
public class Ticket {

    @Id
    private String id; 

    private String category;
    private String title;
    private String description;
    private String status;   // open | in-progress | resolved
    private String priority; // low | medium | high
    private String time;     // human-readable time string
    private Integer replies;
    private String assignee;
    private String requester;

    public Ticket() {}

    public Ticket(String id, String category, String title, String description, String status, String priority, String time, Integer replies, String assignee) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.time = time;
        this.replies = replies;
        this.assignee = assignee;
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Integer getReplies() {
        return replies;
    }

    public void setReplies(Integer replies) {
        this.replies = replies;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id='" + id + '\'' +
                ", category='" + category + '\'' +
                ", title='" + title + '\'' +
                ", status='" + status + '\'' +
                ", priority='" + priority + '\'' +
                ", replies=" + replies +
                ", assignee='" + assignee + '\'' +
                '}';
    }
}
