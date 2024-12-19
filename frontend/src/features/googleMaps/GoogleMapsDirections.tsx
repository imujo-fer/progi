import {
  useMapsLibrary,
  Map,
  APIProvider,
  useMap,
} from "@vis.gl/react-google-maps";
import { message } from "antd";
import { memo, useState, useEffect } from "react";

type DirectionsProps = {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
};

export default function GoogleMapsDirections({
  destination,
  origin,
}: DirectionsProps) {
  return (
    <APIProvider apiKey={"AIzaSyBt-GRg51zN6Wgq51FKhgV0fm_rgpDeG7E"}>
      <Map
        className="w-full h-[400px] relative"
        defaultCenter={{ lat: 45.7937401, lng: 15.9957352 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Directions origin={origin} destination={destination} />
      </Map>
    </APIProvider>
  );
}

const Directions = memo(({ destination, origin }: DirectionsProps) => {
  const map = useMap();
  const [distance, setDistance] = useState<google.maps.Distance | undefined>();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    console.log("Fetching distance");
    if (!directionsService || !directionsRenderer) return;
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      },
      (response) => {
        if (!response) return;
        if ("status" in response && response.status === "ZERO_RESULTS") {
          message.error("No routes found");
          return;
        }
        directionsRenderer.setDirections(response);
        setDistance(response?.routes[0]?.legs[0]?.distance);
      }
    );
  }, [directionsService, directionsRenderer, destination.lat, destination.lng]);

  if (!distance) return null;

  return (
    <div className="absolute top-2 right-2 bg-slate-600/90 p-2 rounded-sm text-white font-medium">
      Distance: <span className="font-bold">{distance.text}</span>
    </div>
  );
});
