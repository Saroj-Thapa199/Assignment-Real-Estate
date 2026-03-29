type User = {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
};

type Property = {
  _id
  title: string
  location: string
  price: number
  image: string
}

type BaseApiResponse = {
  success: boolean
  message?: string
}

type AuthApiResponse = BaseApiResponse & {
  data: {
    user: User
  }
}

type GetAllPropertiesApiResponse = BaseApiResponse & {
  data: {
    properties: Property[]
  }
}

type GetFavouritesApiResponse = BaseApiResponse & {
  data: {
    favourites: Property[]
  }
}