"use client";

import { Heart, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PropertyCardProps {
  property: Property;
  isFavourite: boolean;
  onAddFavourite: (propertyId: string) => void;
  onRemoveFavourite: (propertyId: string) => void;
}

export default function PropertyCard({
  property,
  isFavourite,
  onAddFavourite,
  onRemoveFavourite,
}: PropertyCardProps) {
  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavourite) {
      onRemoveFavourite(property._id);
    } else {
      onAddFavourite(property._id);
    }
  };

  return (
    <Card className="p-0 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border bg-card hover:bg-card/95 group cursor-pointer flex flex-col rounded-sm gap-0">
      {/* Image Container */}
      <div className="relative w-full h-80 sm:h-72 bg-muted overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className=" w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleFavouriteClick}
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-sm transition-all duration-200 flex items-center justify-center backdrop-blur-sm ${
            isFavourite
              ? "bg-destructive text-white"
              : "bg-white/80 text-foreground hover:bg-white"
          }`}
          aria-label={
            isFavourite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <Heart
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill={isFavourite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <CardContent className="p-6 py-4 flex-1 flex flex-col">
        <div className="space-y-1 sm:space-y-1 h-full flex flex-col">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {property.location}
            </p>
          </div>

          {/* Price */}
          <div className="mt-auto ">
            <div className="flex items-center justify-between gap-2 text-blue-600">
              <div className="flex items-center gap-1 sm:gap-2">
                Npr
                <span className="text-xl sm:text-2xl font-bold text-blue-600">
                  {(property.price / 1000).toFixed(0)}k
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
