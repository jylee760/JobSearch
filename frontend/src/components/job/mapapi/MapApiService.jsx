import { useEffect, useContext } from "react";
import { AppContext } from "../AppContext";

export function Map({ latitude, longitude, destLat, destLong }) {
  const { setTimeEst, setIsLoading } = useContext(AppContext);
  useEffect(() => {
    console.log("map");
    setIsLoading(true);
    const geocoder = new google.maps.Geocoder();
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: latitude, lng: longitude },
      styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }],
        },
      ],
      disableDefaultUI: true,
    });
    const youMarker = new google.maps.Marker({
      position: map.center,
      map: map,
    });
    const destMarker = new google.maps.Marker({
      position: new google.maps.LatLng(destLat, destLong),
      map: map,
      title: "Destination",
    });
    const directionsService = new google.maps.DirectionsService();

    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
      origin: youMarker.getPosition(),
      destination: destMarker.getPosition(),
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        setTimeEst(result.routes[0].legs[0].duration);
        console.log(result.routes[0].legs[0].duration);
      } else {
        console.error("Directions request failed due to " + status);
      }
      setIsLoading(false);
    });
  }, [latitude, longitude, destLat, destLong]);

  return <div id="map"></div>;
}

export function getZipCode(lat, long) {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: parseFloat(lat), lng: parseFloat(long) };
    let zipcode = 0;
    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status === "OK") {
        if (results[0]) {
          const postalCode = results[0].address_components.filter(function (
            component
          ) {
            return component.types[0] == "postal_code";
          });
          zipcode = postalCode[0].long_name;
          resolve(zipcode);
        } else {
          reject("No results found");
        }
      } else {
        reject("Geocoder failed due to: " + status);
      }
    });
  });
}
