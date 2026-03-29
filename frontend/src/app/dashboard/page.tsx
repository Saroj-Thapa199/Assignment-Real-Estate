"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Search, MapPin, Home, X, Menu } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { useAuth } from "@/providers/authProvider";
import { axiosInstance } from "@/lib/axiosInstance";
import Sidebar from "@/components/Sidebar";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [favourites, setFavourites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { user, logout, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch properties
        const { data: propsData } =
          await axiosInstance.get<GetAllPropertiesApiResponse>(
            "/api/v1/properties",
          );
        setProperties(propsData.data.properties);

        // fetch favourites
        const { data: favData } =
          await axiosInstance.get<GetFavouritesApiResponse>(
            "/api/v1/favourites",
          );
        setFavourites(favData.data.favourites);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleAddFavourite = async (propertyId: string) => {
    // save last state for roolback in case of fail
    const previousFavourites: Property[] = [...favourites];

    try {
      // do optimistic update for fast
      setFavourites((prev) => {
        return [
          ...prev,
          properties.find(
            (property) => property._id === propertyId,
          ) as Property,
        ];
      });

      await axiosInstance.post(`/api/v1/favourites/${propertyId}`);

      const { data: favsData } =
        await axiosInstance.get<GetFavouritesApiResponse>("/api/v1/favourites");

      setFavourites(favsData.data.favourites);
    } catch (err) {
      // rollback to prev state in case of failure
      setFavourites(previousFavourites);
      toast.error("Failed to add to favourites.", { position: "bottom-right" });
    }
  };

  const handleRemoveFavourite = async (propertyId: string) => {
    // save last state for roolback in case of fail
    const previousFavourites: Property[] = [...favourites];

    try {
      // do optimistic update for fast
      setFavourites((prev) => {
        return prev.filter((fav) => fav._id !== propertyId);
      });

      await axiosInstance.delete(`/api/v1/favourites/${propertyId}`);

      const { data: favsData } =
        await axiosInstance.get<GetFavouritesApiResponse>("/api/v1/favourites");

      setFavourites(favsData.data.favourites);
    } catch (err) {
      // rollback to prev state in case of failure
      setFavourites(previousFavourites);
      toast.error("Failed to remove from favourites.", {
        position: "bottom-right",
      });
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayProperties = activeTab === "saved" ? favourites : properties;
  const isFavourite = (propertyId: string) =>
    favourites.some((p) => p._id === propertyId);

  const filteredProperties = displayProperties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar border-b border-sidebar-border z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Home className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold text-sidebar-foreground">
            RealeState
          </h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 top-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        favourites={favourites}
        user={user}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8 lg:ml-64">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 lg:mb-8 mt-3 sm:mt-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {activeTab === "all"
              ? "Explore Properties"
              : "Your Saved Properties"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {activeTab === "all"
              ? "Discover your perfect home from our curated listings"
              : "Manage and view all your favorite properties"}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 lg:mb-8">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background text-sm"
            />
          </div>
        </div>

        {/* Properties Grid */}
        <div>
          {filteredProperties.length === 0 ? (
            <Card className="border border-border">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  {searchQuery
                    ? "No results found"
                    : activeTab === "all"
                      ? "No properties available"
                      : "No saved properties yet"}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : activeTab === "all"
                      ? "Check back soon for new listings"
                      : "Start saving properties to see them here"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProperties.map((property, i) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  isFavourite={isFavourite(property._id)}
                  onAddFavourite={handleAddFavourite}
                  onRemoveFavourite={handleRemoveFavourite}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
