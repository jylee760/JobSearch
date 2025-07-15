import MainComponent from "./MainComponent";
import { getUserJobs } from "../../api/jobApi";
import { useEffect, useState} from "react";
import { retrieveJobs } from "./adzunzaapi/AdzunzaApiService";
export default function SavedComponent() {
  const [savedJobs, setSavedJobs] = useState(null);
  const [collection2, setCollection2] = useState(null);
  const [collection, setCollection] = useState(null);
  useEffect(() => {
  const fetchJobs = async () => {
    try {
      
      console.log(localStorage.getItem("token"))
      const response = await getUserJobs();
      setSavedJobs(response.data);
    } catch (err) {
      console.error("Error fetching saved jobs", err);
    }
  };
  fetchJobs();
}, []);
useEffect(() => {
  if (savedJobs !== null) {
    const res = []
    for(i = 0;i<savedJobs.length;i++){
      res.push(savedJobs[i][2])
    }
    setCollection2(res)
  }
}, [savedJobs]);
useEffect(()=>{
  if (collection2!== null){
    async function fetchData() {
          if (location !== "") {
            const collection_ = await retrieveJobs(
            );
            collection_.results.filter(job=>collection2.includes(job.id))
            setCollection(collection_);
          }
        }
  }
},[collection2])
  return (
      <div className="main-body">
      </div>
    );
}
