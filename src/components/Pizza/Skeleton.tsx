import ContentLoader from "react-content-loader";
type Props = {
  pizzaData: object;
};
const Skeleton = (props: Props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="148" r="112" />
    <rect x="8" y="281" rx="10" ry="10" width="259" height="23" />
    <rect x="7" y="320" rx="10" ry="10" width="262" height="70" />
    <rect x="9" y="410" rx="9" ry="9" width="94" height="36" />
    <rect x="132" y="408" rx="14" ry="14" width="138" height="43" />
  </ContentLoader>
);

export default Skeleton;
