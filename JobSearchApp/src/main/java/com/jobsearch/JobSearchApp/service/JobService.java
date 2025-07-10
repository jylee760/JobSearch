package com.jobsearch.JobSearchApp.service;

import com.jobsearch.JobSearchApp.model.Job;
import com.jobsearch.JobSearchApp.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    @Autowired
    JobRepo jobRepo;
    public List<Job> getAllJobsByUsername(String username){
        return jobRepo.findAllByUsername(username);
    }
    public Job getJobById(int id){
        return jobRepo.findById(id).orElse(null);
    }
    public Job saveJob(int id, String username){
        Job newJob = new Job();
        newJob.setJobId(id);
        newJob.setUsername(username);
        return jobRepo.save(newJob);
    }
}
