import { motion } from "framer-motion";

function ImageManga({ width, height, src }) {
  return (
    <img
      style={{ objectFit: "cover", borderRadius: 15 }}
      width={width}
      height={height}
      src={src}
    />
  );
}

export default ImageManga;
