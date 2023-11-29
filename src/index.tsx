import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);

console.log(
  "Hey 🙋🏻‍♂️\nTry placing 5 favorite players on each team.\nThe UI aligns perfectly on various screen sizes.\n( i.e - My best 5 VS yours )"
);
