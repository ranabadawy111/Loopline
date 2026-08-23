import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Board from "./pages/Board";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/board"
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
