/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import Image from "./Image";

export default function PlaceImg({ place, index = 0 }) {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return <Image className={className} src={place.photos[index]} alt="" />;
}
