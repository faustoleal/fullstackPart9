import { useEffect, useState } from "react";
import { Diary, Visibility, Weather } from "./types";
import { createDiary, getDiaries } from "./diaryService";

function App() {
  const [visibility, setVisibility] = useState<Visibility>("good");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [comment, setComment] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([
    {
      id: 1,
      date: "01/01/2025",
      weather: "sunny",
      visibility: "great",
      comment: "",
    },
  ]);

  useEffect(() => {
    getDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const visibilitySelected = (value: Visibility) => {
    setVisibility(value);
  };

  const weatherSelected = (value: Weather) => {
    setWeather(value);
  };

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    }).then((data) => {
      setDiaries(diaries.concat(data));
    });
    setDate("");
    setVisibility("good");
    setWeather("stormy");
    setComment("");
  };
  return (
    <>
      <h2>Add new diary</h2>
      <form onSubmit={diaryCreation}>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <div>
          visibility{" "}
          <input
            type="radio"
            id="great"
            name="visibility"
            onChange={() => visibilitySelected("great")}
          />{" "}
          <label htmlFor="great">great</label>
          <input
            type="radio"
            id="good"
            name="visibility"
            onChange={() => visibilitySelected("good")}
          />{" "}
          <label htmlFor="good">good</label>
          <input
            type="radio"
            id="ok"
            name="visibility"
            onChange={() => visibilitySelected("ok")}
          />{" "}
          <label htmlFor="ok">ok</label>
          <input
            type="radio"
            id="poor"
            name="visibility"
            onChange={() => visibilitySelected("poor")}
          />{" "}
          <label htmlFor="poor">poor</label>
        </div>
        <div>
          visibility{" "}
          <input
            type="radio"
            id="sunny"
            name="weahter"
            onChange={() => weatherSelected("sunny")}
          />{" "}
          <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            id="rainy"
            name="weahter"
            onChange={() => weatherSelected("rainy")}
          />{" "}
          <label htmlFor="rainy">rainy</label>
          <input
            type="radio"
            id="cloudy"
            name="weahter"
            onChange={() => weatherSelected("cloudy")}
          />{" "}
          <label htmlFor="cloudy">cloudy</label>
          <input
            type="radio"
            id="windy"
            name="weahter"
            onChange={() => weatherSelected("windy")}
          />{" "}
          <label htmlFor="windy">windy</label>
          <input
            type="radio"
            id="stormy"
            name="weahter"
            onChange={() => weatherSelected("stormy")}
          />{" "}
          <label htmlFor="stormy">stormy</label>
        </div>
        comment{" "}
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />{" "}
        <br />
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <ul>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            visibility:{diary.visibility} <br />
            weather: {diary.weather} <br />
            {diary.comment}
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
