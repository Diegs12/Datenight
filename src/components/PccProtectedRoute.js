import { Navigate, useLocation } from "react-router-dom";
import { usePccAuth } from "../auth/PccAuthContext";

export default function PccProtectedRoute({ children }) {
  const location = useLocation();
  const { configured, loading, session } = usePccAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0B",
        color: "#F5F0EB",
        fontFamily: "'Inter', sans-serif",
      }}>
        Loading secure workspace...
      </div>
    );
  }

  if (!configured) {
    return <Navigate to="/pcc/login?reason=config" replace />;
  }

  if (!session) {
    return <Navigate to={`/pcc/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}
