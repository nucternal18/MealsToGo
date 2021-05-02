import React from "react";
import styled from "styled-components/native";

import CompactRestaurantInfo from "../../../components/restaurant/compact-restaurant-info.component";

const MapCallout = ({ restaurant }) => {
  return <CompactRestaurantInfo isMap restaurant={restaurant} />;
};

export default MapCallout;
