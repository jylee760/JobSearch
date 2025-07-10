package com.jobsearch.JobSearchApp.repo;

import com.jobsearch.JobSearchApp.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<Job,Integer> {
    List<Job> findAllByUsername(String username);
}
