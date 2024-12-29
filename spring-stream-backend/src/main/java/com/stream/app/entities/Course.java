package com.stream.app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Course {

    @Id
    private String id;

    private String title;

}
