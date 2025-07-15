package com.jobsearch.JobSearchApp.controller;

import com.jobsearch.JobSearchApp.DTO.SaveJobRequest;
import com.jobsearch.JobSearchApp.model.Job;
import com.jobsearch.JobSearchApp.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173", allowCredentials="true")
@RestController
@RequestMapping("/jobs")
public class JobController {
    @Autowired
    JobService jobService;
    @GetMapping("/user-jobs")
    public ResponseEntity<List<Job>> getJobs(Authentication auth){
        return ResponseEntity.ok(jobService.getAllJobsByUsername(auth.getName()));
    }
    @GetMapping("/user-jobs/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable int id){
        Job job = jobService.getJobById(id);
        if (job == null)
        {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(job);
    }
    @PostMapping("/user-jobs")
    public ResponseEntity<Job> saveJob(@RequestBody SaveJobRequest request, Authentication auth){
        Job job = jobService.saveJob(request.getJobId(),auth.getName());
        URI location = URI.create("/jobs/user-jobs"+job.getId());
        return ResponseEntity.created(location).body(job);
    }

}
