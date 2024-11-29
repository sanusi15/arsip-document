import { ThreeDot } from "react-loading-indicators";
const LoadingBall = () => (
  <div className="w-full h-full flex items-center justify-center">
    <ThreeDot
      variant="bounce"
      color="#adb5bd"
      size="medium"
      text=""
      textColor=""
    />
  </div>
);

export default LoadingBall;
