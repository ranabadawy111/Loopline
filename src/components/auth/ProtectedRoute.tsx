import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../app/authSlice";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}
