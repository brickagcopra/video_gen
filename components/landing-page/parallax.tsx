export default function Parallax({
  url,
  children,
  paddingTop = "pt-52", // equivalent to 200px
  paddingBottom = "pb-52", // equivalent to 200px
}: any) {
  return (
    <div className={`relative ${paddingTop} ${paddingBottom} overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${url})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-90"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
