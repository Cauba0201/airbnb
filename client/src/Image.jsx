/* eslint-disable react/prop-types */
export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "http://localhost:4000/uploads/+src;0";
  return <img {...rest} src={src} alt={""} />;
}
