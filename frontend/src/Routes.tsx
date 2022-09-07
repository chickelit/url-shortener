import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Redirect } from "./pages/Redirect";

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
