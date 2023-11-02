import React, { useEffect, useState } from "react";

const Characters = ({ selectedEpisode, allData }: any) => {
  const [charactersData, setCharactersData] = useState<any>([]);

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
    const selectedEpisodeCharacters = allData.filter(
      (data: any) => data.name == selectedEpisode
    );
    const resultCharacters = selectedEpisodeCharacters.map(
      (data: any) => data.characters
    );

    const urls: string[] = selectedEpisode
      ? [...resultCharacters[0]]
      : ["https://rickandmortyapi.com/api/character"];

    const dataPromises = urls.map((url) => fetchData(url));

    const dataArray = await Promise.all(dataPromises);

    const combinedResults = selectedEpisode
      ? dataArray.flatMap((item) => item.image)
      : dataArray.flatMap((item) => item.results);
    setCharactersData(combinedResults);

    console.log(combinedResults, "charecters");

    console.log(urls, "urls");
  }

  useEffect(() => {
    fetchAllData();
  }, [selectedEpisode]);

  return (
    <div>
      {charactersData.map((character: any, index: number) => (
        <img
          src={selectedEpisode ? character : character.image}
          alt="character-img"
          key={index}
          width={150}
          height={150}
          style={{ margin: "10px", borderRadius: "20px" }}
        ></img>
      ))}
    </div>
  );
};

export default Characters;
