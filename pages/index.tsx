import React, { useState } from "react";
import Episode from "../components/episodes";
import Characters from "../components/characters";

const IndexPage: React.FC = () => {
  const [allData, setAllData] = useState<any>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<string>("");
  return (
    <div>
      <Episode
        setSelectedEpisode={setSelectedEpisode}
        selectedEpisode={selectedEpisode}
        allData={allData}
        setAllData={setAllData}
      />
      <Characters selectedEpisode={selectedEpisode} allData={allData} />
    </div>
  );
};

export default IndexPage;
