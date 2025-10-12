import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || "",
    address: user.address?.street || "",
    city: user.address?.city || "",
    state: user.address?.state || "",
    zipCode: user.address?.zipCode || "",
  });

  const handleSave = () => {
    setEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          <div className="space-y-6">
            {/* Basic Info Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Account Information</h2>
                <Button
                  variant="outline"
                  onClick={() => editing ? handleSave() : setEditing(true)}
                >
                  {editing ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {editing ? (
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        ) : (
                          <span>{user.name}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{user.email} (Cannot be changed)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {editing ? (
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        ) : (
                          <span>{user.phone || "Not provided"}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {new Date(user.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Address Card */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>

              {editing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ) : user.address ? (
                <div className="text-muted-foreground">
                  <p>{user.address.street}</p>
                  <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No address provided</p>
              )}
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/orders")}>
                View Orders
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
