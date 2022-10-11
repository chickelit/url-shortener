import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Redirect } from "./pages/Redirect";
import Home from "./pages/Home";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:key" element={<Redirect />} />
      </Routes>
    </Router>
  );
}
