import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Home, Package, ShoppingCart, Users, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white">
        {/* Admin Header */}
        <div className="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
        </div>

        {/* Admin Menu */}
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Admin User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <Badge variant="secondary" className="text-xs">
                  Admin
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Admin Top Bar */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            ShopHub Admin Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.name}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              View Website
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};