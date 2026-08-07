import { Navigate } from "react-router-dom";
import { getDefaultRoute, getStoredUser, hasAccess } from "../../utils/auth";

type ProtectedRouteProps = {
  children: React.ReactElement;
  requiredPath: string;
};

export default function ProtectedRoute({ children, requiredPath }: ProtectedRouteProps) {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAccess(user, requiredPath)) {
    return <Navigate to={getDefaultRoute(user.role)} replace />;
  }

  return children;
}
