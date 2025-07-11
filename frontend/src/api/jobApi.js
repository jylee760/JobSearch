import api from "./apiClient";

export const getUserJobs = () => {
  return api.get("/jobs/user-jobs");
};


export const getJobById = (jobId) => {
  return api.get(`/user-jobs/${jobId}`);
};

export const saveJob = (jobId) => {
  return api.post('/user-jobs', { jobId });
};