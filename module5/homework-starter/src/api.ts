const API_URL = "http://localhost:3000";

export interface Restaurant {
  name: string;
  description: string;
  raiting: number;
  url: string;
  id: string;
}


export const getRestaurants = async() => {
  const response = await fetch(`${API_URL}/restaurants`)
  return response.json();
  }

interface UpdateRestaurantRaitingArgs {
  id: Restaurant["id"];
  raiting: Restaurant["raiting"];
}

export const updateRestaurantRating = ({
  id,
  raiting,
}: UpdateRestaurantRaitingArgs): Promise<Restaurant> =>
  fetch(`${API_URL}/restaurants/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ raiting }),
  }).then((res) => res.json());
