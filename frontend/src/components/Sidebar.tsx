import { Heart, Home, LogOut, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  user: User;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<"all" | "saved">>;
  favourites: Property[];
  handleLogout: () => void;
}

const Sidebar = ({
  user,
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  favourites,
  handleLogout,
}: SidebarProps) => {
  return (
    <aside
      className={`fixed lg:fixed left-0 top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-40 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="hidden lg:flex p-6 border-b border-sidebar-border items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
          <Home className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold text-sidebar-foreground">
          RealEstate
        </h1>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        <button
          onClick={() => {
            setActiveTab("all");
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === "all"
              ? "bg-blue-200/50 text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-blue-200/25"
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="font-medium">Browse All</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("saved");
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
            activeTab === "saved"
              ? "bg-blue-200/50 text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:hover:bg-blue-200/25"
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="font-medium">Saved</span>
          {favourites.length > 0 && (
            <span className="ml-auto bg-blue-600 text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
              {favourites.length}
            </span>
          )}
        </button>
      </nav>

      <div className="p-6 border-t border-sidebar-border">
        <div className="bg-blue-200/50 rounded-lg p-4 mb-4">
          <p className="text-sm text-sidebar-accent-foreground/75 mb-1">
            Logged in as
          </p>
          <p className="font-semibold text-sidebar-accent-foreground truncate">
            {user.fullName}
          </p>
          <p className="text-xs text-sidebar-accent-foreground/60 truncate">
            {user.email}
          </p>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
