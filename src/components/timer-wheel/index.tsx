import React, { useEffect, useState, useRef, CSSProperties } from "react";
import { TimerWheelProps } from "@hypercontext/types/base";
const overTimeWaningColor = "rgba(255, 0, 0, 1)";
/**
 * TimerWheel component displaying a gradient countdown wheel.
 * @param totalTime - The total time for the timer in minutes.
 * @param isDisplayedInQuarters - Whether the timer should calculate progress in quarters.
 * @param gradientStart - The start color of the gradient.
 * @param gradientEnd - The end color of the gradient.
 * @param gradientAtThreeQuartersStart - The start color of the gradient at three-quarters.
 * @param gradientAtThreeQuartersEnd - The end color of the gradient at three-quarters.
 * @param gradientAtCompletionStart - The start color of the gradient when completed.
 * @param gradientAtCompletionEnd - The end color of the gradient when completed.
 * @param children - The children to be displayed in the inner circle.
 * @param size - The default size for the outer circle, with the inner circle at 80% of this size.
 * @param className - Additional className for the outer circle.
 * @returns A TimerWheel component.
 *
 * @example
 *
 * <TimerWheel
 *  totalTime={10}
 *  isDisplayedInQuarters={true}
 *  gradientStart="rgba(0, 255, 224, 1)"
 *  gradientEnd="rgba(0, 87, 255, 1)"
 *  gradientAtThreeQuartersStart="rgba(255, 61, 0, 1)"
 *  gradientAtThreeQuartersEnd="rgba(255, 199, 0, 1)"
 *  gradientAtCompletionStart="rgba(37, 236, 173, 1)"
 *  gradientAtCompletionEnd="rgba(37, 236, 173, 1)"
 *  className="timer-wheel-marker"
 *  size={60}
 *  children={<i className="material-symbols-outlined">check_circle</i>}
 * />
 *
 */

const TimerWheel = ({
  totalTime,
  isDisplayedInQuarters = false,
  gradientStart = "rgba(0, 255, 224, 1)",
  gradientEnd = "rgba(0, 87, 255, 1)",
  gradientAtThreeQuartersStart = "rgba(255, 61, 0, 1)",
  gradientAtThreeQuartersEnd = "rgba(255, 199, 0, 1)",
  gradientAtCompletionStart = "rgba(37, 236, 173, 1)",
  gradientAtCompletionEnd = "rgba(37, 236, 173, 1)",
  children,
  size = 200,
  className = "",
}: TimerWheelProps) => {
  const totalTimeInSeconds = totalTime * 60;
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsedTime = (time - startTimeRef.current) / 1000;
      const elapsedPercentage = Math.min(
        (elapsedTime / totalTimeInSeconds) * 100,
        100
      );

      if (elapsedPercentage < 100) {
        requestRef.current = requestAnimationFrame(animate);
        setTimeLeft(totalTimeInSeconds - Math.floor(elapsedTime));
      } else {
        setTimeLeft(0);
      }
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [totalTimeInSeconds]);

  useEffect(() => {
    setTimeLeft(totalTimeInSeconds);
  }, [totalTimeInSeconds]);

  const calculateRotation = () => {
    if (isDisplayedInQuarters) {
      const quarterTime = totalTimeInSeconds / 4;
      const quartersCompleted = Math.floor(
        (totalTimeInSeconds - timeLeft) / quarterTime
      );
      return (quartersCompleted / 4) * 360;
    } else {
      return (360 * (totalTimeInSeconds - timeLeft)) / totalTimeInSeconds;
    }
  };

  const calculateCurrentGradient = () => {
    const percentage = (totalTimeInSeconds - timeLeft) / totalTimeInSeconds;

    if (percentage === 1 && !isDisplayedInQuarters) {
      return {
        start: overTimeWaningColor,
        end: overTimeWaningColor,
      };
    } else if (percentage >= 0.75 && !isDisplayedInQuarters) {
      return {
        start: gradientAtThreeQuartersStart,
        end: gradientAtThreeQuartersEnd,
      };
    } else if (isDisplayedInQuarters && timeLeft === 0) {
      return {
        start: gradientAtCompletionStart,
        end: gradientAtCompletionEnd,
      };
    } else {
      return {
        start: gradientStart,
        end: gradientEnd,
      };
    }
  };

  const { start: currentGradientStart, end: currentGradientEnd } =
    calculateCurrentGradient();

  const outerCircleStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    position: "relative",
    overflow: "hidden",
  };

  const gradientTailStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    background: `conic-gradient(from 0deg, ${currentGradientStart} 0%, ${currentGradientEnd} ${calculateRotation()}deg, transparent ${calculateRotation()}deg)`,
    borderRadius: "50%",
  };

  const headMarbleStyle: CSSProperties = {
    width: `${size * 0.0999}px`,
    height: `${size * 0.0999}px`,
    borderRadius: "50%",
    backgroundImage: `linear-gradient(${180}deg, ${currentGradientEnd}, ${currentGradientStart})`,
    position: "absolute",
    top: `calc(50% - ${size * 0.049}px)`,
    left: `calc(50% - ${size * 0.049}px)`,
    transformOrigin: `center`,
    transform: `rotate(${calculateRotation() - 90}deg) translate(${
      size / 2 - size * 0.05
    }px)`,
    zIndex: 1,
  };

  const startingPositionMarbleStyle: CSSProperties = {
    width: `${size * 0.0999}px`,
    height: `${size * 0.0999}px`,
    borderRadius: "50%",
    backgroundImage: `linear-gradient(${180}deg, ${currentGradientEnd}, ${currentGradientStart})`,
    position: "absolute",
    top: `calc(50% - ${size * 0.049}px)`,
    left: `calc(50% - ${size * 0.049}px)`,
    transformOrigin: `center`,
    transform: `rotate(${-90}deg) translate(${size / 2 - size * 0.05}px)`,
    zIndex: 1,
  };

  const innerCircleStyle: CSSProperties = {
    width: `${size * 0.8}px`,
    height: `${size * 0.8}px`,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className={`outer-circle ${className}`} style={outerCircleStyle}>
      <div className="gradient-tail" style={gradientTailStyle}>
        <div className="inner-circle" style={innerCircleStyle}>
          {children}
        </div>
      </div>
      <div className="marble" style={startingPositionMarbleStyle}></div>
      <div className="marble" style={headMarbleStyle}></div>
    </div>
  );
};

export default TimerWheel;
