import ReactDOM from "react-dom/client";
import { AppRoutes } from "./Routes";
import "normalize.css";
import "../public/styles/base.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppRoutes />
);
