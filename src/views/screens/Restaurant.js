import React, { useEffect, useState } from "react";
import Table from "../../utilities/Table";
import { restaurantColumns } from "../../utilities/utility";
import RestaurantCards from "../components/restaurant/RestaurantCards";
import { getRestaurants } from "../../actions/restaurantAction";
import Loading from "../../utilities/Loading";



export default function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    const restaurants = await getRestaurants()
    setRestaurant(restaurants)
    setLoaded(true)
  }, []);
  if (!loaded) { return (<Loading />) }
  return (
    <div className="wrapper wrapper-content">
      {
        loaded && (<>
          <RestaurantCards data={restaurant} />
          <Table
            title="Restaurant"
            data={restaurant}
            flag={true}
            columns={restaurantColumns}
          />
        </>
        )
      }
    </div>
  );
}
