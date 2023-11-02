import React, { useEffect, useState } from "react";
import "../styles/Home.module.css";
// import {setSelectedEpisode} from "../pages/index"

const Episode = ({
  setSelectedEpisode,
  selectedEpisode,
  allData,
  setAllData,
}: any) => {
  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async function fetchAllData(): Promise<void> {
    const urls: string[] = [
      "https://rickandmortyapi.com/api/episode",
      "https://rickandmortyapi.com/api/episode?page=2",
      "https://rickandmortyapi.com/api/episode?page=3",
    ];

    const dataPromises = urls.map((url) => fetchData(url));
    const dataArray = await Promise.all(dataPromises);

    const combinedResults = dataArray.flatMap((item) => item.results);
    setAllData(combinedResults);
    console.log(combinedResults, "mergedData");
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {allData.map((episode: any) => (
          <li
            key={episode.id}
            onClick={() => setSelectedEpisode(episode.name)}
            className={
              episode.name == selectedEpisode ? "selected episode" : "episode"
            }
          >
            {episode.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Episode;
