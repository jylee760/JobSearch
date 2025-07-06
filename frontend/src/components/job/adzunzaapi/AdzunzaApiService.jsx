import axios from "axios";
const appId = import.meta.env.VITE_ADZUNA_APP_ID;
const appKey = import.meta.env.VITE_ADZUNA_APP_KEY;
export async function retrieveJobs(
  jobType,
  location,
  searchField,
  distanceFilter
) {
  let searchContent = searchField.replace(/ /g, "%20");
  const contentType = `&content-type=application/json`;
  const link = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=20&where=${location}&distance=${distanceFilter}&title_only=${searchContent}`;
  let job = "";
  if (jobType !== null) {
    job = `&${jobType}=1`;
  }
  const apiReq = link + job + contentType;
  console.log(apiReq);
  try {
    const response = await axios.get(apiReq);
    return response.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
}
