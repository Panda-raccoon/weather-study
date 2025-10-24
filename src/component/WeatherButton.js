import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = () => {
  return (
    <div>
      <Button variant="warning">CurrentLocation</Button>
      <Button variant="warning">Paris</Button>
      <Button variant="warning">NewYork</Button>
      <Button variant="warning">Japan</Button>
    </div>
  );
};

export default WeatherButton;
