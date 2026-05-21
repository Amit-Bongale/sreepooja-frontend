import { BrowserRouter } from "react-router";
import CustomRouter from "./router/CustomRouter";

function App() {
  return (
    <BrowserRouter>
      <CustomRouter />
    </BrowserRouter>
  );
}

export default App;
