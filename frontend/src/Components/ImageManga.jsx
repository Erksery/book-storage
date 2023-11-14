import LazyLoad from "react-lazyload";
function ImageManga({ width, height, src }) {
  return (
    <LazyLoad>
      <img
        style={{ objectFit: "cover", }}
        width={width}
        height={height}
        src={src}
      />
    </LazyLoad>
  );
}

export default ImageManga;
