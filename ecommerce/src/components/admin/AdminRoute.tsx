import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/layout/AdminLayout";

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAdmin } = useAuth();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If admin, render with admin layout
  return <AdminLayout>{children}</AdminLayout>;
};