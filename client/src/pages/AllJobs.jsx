import { toast } from "react-toastify";
import JobContainer from "../components/JobContainer";
import { SearchContainer } from "../components/SearchContainer";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

const allJobsContext = createContext();

export const loader = async () => {
  const { data } = await customFetch.get("/jobs");
  return { data };
};

const AllJobs = () => {
  const { data } = useLoaderData();

  return (
    <allJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobContainer />
    </allJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(allJobsContext);

export default AllJobs;
