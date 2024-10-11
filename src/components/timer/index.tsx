// export default Timer;
import React, { useState, useEffect } from "react";
import { TimerProps } from "@hypercontext/types/base";
import { useTimer, useStopwatch } from "react-timer-hook";

/**
 * Timer component that displays a countdown timer or stopwatch when the countdown has expired.
 * @param expiryDateTime - date object representing the expiry time.
 * @param IsExpired - boolean representing if the timer has expired.
 * @param onIsExpired - function to call when the timer expires.
 * @param addStopWatch - boolean representing if a stopwatch should be added after the timer expires.
 * @returns A Timer component.
 */

/**
 *
 * @example
 *
 * time = new Date();
 * time.setSeconds(time.getSeconds() + 600);
 *
 * <Timer
 * expiryDateTime={time}
 * onIsExpired={() => console.log("Timer expired")}
 * IsExpired={false}
 * addStopWatch={true}
 * />
 */

const Timer = ({
  expiryDateTime,
  IsExpired,
  onIsExpired,
  addStopWatch,
}: TimerProps) => {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiryDateTime);

  useEffect(() => {
    setExpiryTimestamp(expiryDateTime);
  }, [expiryDateTime]);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => onIsExpired && onIsExpired(),
    autoStart: false,
  });

  const {
    seconds: stopWatchSeconds,
    minutes: stopWatchMinutes,
    start: stopWatchStart,
  } = useStopwatch({ autoStart: false });

  useEffect(() => {
    restart(expiryTimestamp);
  }, [expiryTimestamp, restart]);

  useEffect(() => {
    if (IsExpired && addStopWatch) {
      stopWatchStart();
    }
  }, [IsExpired, stopWatchStart, addStopWatch]);

  const timeLabel = () => {
    if (minutes > 0) {
      return minutes === 1 ? "Minute" : "Minutes";
    } else if (seconds > 0) {
      return "Seconds";
    } else if (stopWatchMinutes < 1) {
      return "Seconds";
    } else {
      return stopWatchMinutes === 1 ? "Minute" : "Minutes";
    }
  };

  return (
    <div className="timer">
      <header className="timer__header">
        {IsExpired && addStopWatch ? "Over by" : "Time left"}
      </header>

      {IsExpired && addStopWatch ? (
        <div className="timer__minutes">
          {stopWatchMinutes > 0
            ? `${stopWatchMinutes} `
            : `${stopWatchSeconds}`}
        </div>
      ) : (
        <div className="timer__minutes">
          {minutes > 0 ? `${minutes} ` : `${seconds}`}
        </div>
      )}

      <div className="timer__label">{timeLabel()}</div>
    </div>
  );
};

export default Timer;
