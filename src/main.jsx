import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import StarRating from "./StarRating";
// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
//       <p> this movie was rated {movieRating} stars</p>
//     </div>
//   );
// }
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "OK", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={3} />
    <Test /> */}
  </StrictMode>
);
