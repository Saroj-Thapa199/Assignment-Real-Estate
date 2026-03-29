import mongoose from "mongoose";
import { PropertyModel } from "../models/property.model";
import { FavouriteModel } from "../models/favourites.model";
import dotenv from "dotenv";

dotenv.config();

// export const properties = [
//   {
//     title: "Modern Apartment in Kathmandu",
//     location: "Kathmandu",
//     price: 120000,
//   },
//   { title: "Luxury Villa in Lalitpur", location: "Lalitpur", price: 350000 },
//   { title: "Cozy Studio Near Thamel", location: "Kathmandu", price: 80000 },
//   { title: "Family House in Bhaktapur", location: "Bhaktapur", price: 200000 },
//   { title: "Penthouse with City View", location: "Kathmandu", price: 500000 },
//   { title: "Affordable Flat in Pokhara", location: "Pokhara", price: 90000 },
//   { title: "Lake View Cottage", location: "Pokhara", price: 180000 },
//   { title: "Modern Duplex Home", location: "Lalitpur", price: 250000 },
//   { title: "Budget Room for Rent", location: "Kathmandu", price: 40000 },
//   { title: "Premium Villa with Garden", location: "Bhaktapur", price: 420000 },
//   { title: "City Center Apartment", location: "Kathmandu", price: 150000 },
//   { title: "Mountain View House", location: "Pokhara", price: 300000 },
//   { title: "Shared Flat for Students", location: "Kathmandu", price: 30000 },
//   { title: "Elegant Family Residence", location: "Lalitpur", price: 275000 },
//   { title: "Minimalist Modern Home", location: "Bhaktapur", price: 220000 },
// ];

export const properties = [
  { title: "Modern Apartment in Kathmandu", location: "Kathmandu", price: 120000, image: "https://nepalhomesearch.b-cdn.net/wp-content/uploads/2020/05/kapan-6.jpg" },
  { title: "Luxury Villa in Lalitpur", location: "Lalitpur", price: 350000, image: "https://www.propertynepal.com/images/properties/1/1672383570.jpeg" },
  { title: "Cozy Studio Near Thamel", location: "Kathmandu", price: 80000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2JZwkjDXfztDv6YBTw5fnFMRsUhf4bHB8jw&s" },
  { title: "Family House in Bhaktapur", location: "Bhaktapur", price: 200000, image: "https://www.realestateinnepal.com/wp-content/uploads/2019/03/2.jpeg" },
  { title: "Penthouse with City View", location: "Kathmandu", price: 500000, image: "https://backend.lalpurjanepal.com.np/media/properties/WhatsApp_Image_2025-11-08_at_18.22.36_e8e1605e.jpg" },
  { title: "Affordable Flat in Pokhara", location: "Pokhara", price: 90000, image: "https://epropertynepal.com/system/photos/21602/original_1.jpg?1660639794" },
  { title: "Lake View Cottage", location: "Pokhara", price: 180000, image: "https://propertynepal.com/images/properties/2129/1690355436490.jpg" },
  { title: "Modern Duplex Home", location: "Lalitpur", price: 250000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0PnZ3UjhLNxkPzL_us-Kltyk3P542XQW6Gg&s" },
  { title: "Budget Room for Rent", location: "Kathmandu", price: 40000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCth_8S3oWjrH4TyOhXBfH7JOVo8Ki5omlYQ&s" },
  { title: "Premium Villa with Garden", location: "Bhaktapur", price: 420000, image: "https://www.realestateinnepal.com/wp-content/uploads/2024/06/House-For-Sale-In-Kathmandu.jpg" },
  { title: "City Center Apartment", location: "Kathmandu", price: 150000, image: "https://gharsansarnepal.com/image/17733998601.png" },
  { title: "Mountain View House", location: "Pokhara", price: 300000, image: "https://epropertynepal.com/system/photos/29720/medium_IMG20260222162810_copy.jpg?1771837618" },
  { title: "Shared Flat for Students", location: "Kathmandu", price: 30000, image: "https://backend.lalpurjanepal.com.np/media/properties/image_picker_0620BF6F-0164-4813-9C0F-07B07B585C8B-12611-00000668321A75E5.jpg" },
  { title: "Elegant Family Residence", location: "Lalitpur", price: 275000, image: "https://www.propertynepal.com/images/properties/1026/168405890059.jpg" },
  { title: "Minimalist Modern Home", location: "Bhaktapur", price: 220000, image: "https://thehimalayantimes.com/uploads/imported_images/wp-content/uploads/2016/08/Real-Estate-plan.jpg" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("DB Connected");

    await PropertyModel.deleteMany({});
    await FavouriteModel.deleteMany();

    await PropertyModel.insertMany(properties);

    console.log("Seed successfull");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.log(error);
    console.log("Failed to sed data");
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDB();
