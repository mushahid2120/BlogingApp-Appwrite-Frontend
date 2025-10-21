export default function ImageView({
  src,
  width = "w-auto",
  height = "h-auto",
}) {
  if (src === "")
    return (
      <div
        className={`${width} ${height} flex justify-center mb-2 bg-slate-200`}
      ></div>
    );
  return (
    <div className={`${width} ${height} flex justify-center mb-2`}>
      <img
        className="h-full w-full object-cover"
        src={src}
        alt="myimage"
        accept="image/png, image/jpg, image/jpeg, image/gif"
      />
    </div>
  );
}
