import { Fragment } from "react";
import RoutesFront from "./routes/RoutesFront";

export const URL_SERVER = "http://localhost:3001"
export const API_CLIET = "http://localhost:3000"

function App() {
  return (
    <Fragment>
      <RoutesFront />
    </Fragment>
  );
}

export default App;
