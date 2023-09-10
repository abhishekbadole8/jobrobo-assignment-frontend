import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ path, token, children }) {
  return (
    <Route path={path} element={token ? children : <Navigate to="/login" />} />
  );
}

export default ProtectedRoute;
