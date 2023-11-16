import React from "react"
import ContentLoader from "react-content-loader"
 type Props = {
    pizzaData: object;
 }
const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
<circle cx="130" cy="125" r="123" /> 
    <rect x="-1" y="283" rx="10" ry="10" width="282" height="27" /> 
    <rect x="0" y="328" rx="10" ry="10" width="278" height="75" /> 
    <rect x="1" y="416" rx="9" ry="9" width="94" height="36" /> 
    <rect x="138" y="412" rx="14" ry="14" width="138" height="43" />
  </ContentLoader>
)

export default Skeleton