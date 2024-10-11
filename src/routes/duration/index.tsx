import React, { useState, useEffect } from "react";
import bot from "@hypercontext/svg/bot.svg";
import TimerWheel from "@hypercontext/components/timer-wheel/index";
import Timer from "@hypercontext/components/timer/index";
import { useSearchParams, useNavigate } from "react-router-dom";
import { differenceInMinutes, add } from "date-fns";
import checkMarkIcon from "@hypercontext/svg/check.svg";

export default function Duration() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [totalDuration, setTotalDuration] = useState(0);
  const [IsExpired, setIsExpired] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (searchParams.has("startTime")) {
      const decodedStartTime = decodeURIComponent(
        searchParams.get("startTime") || ""
      );
      const startDate = new Date(decodedStartTime);
      setStartTime(startDate);
    }

    if (searchParams.has("endTime")) {
      const decodedEndTime = decodeURIComponent(
        searchParams.get("endTime") || ""
      );
      const endDate = new Date(decodedEndTime);
      setEndTime(endDate);
    }

    if (
      !searchParams.has("startTime") ||
      !searchParams.has("endTime") ||
      (!searchParams.has("startTime") && !searchParams.has("endTime"))
    ) {
      navigate("/");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    setTotalDuration(
      differenceInMinutes(new Date(endTime), new Date(startTime))
    );
  }, [startTime, endTime]);

  useEffect(() => {
    setTime(add(new Date(), { minutes: totalDuration }));
  }, [totalDuration]);

  return (
    <div className="duration">
      <div className="duration__content-main">
        <TimerWheel
          className="completed__timer-wheel-marker"
          totalTime={totalDuration}
          isDisplayedInQuarters={true}
          gradientStart="rgba(206, 101, 255, 1)"
          gradientEnd="rgba(98, 0, 222, 1)"
          gradientAtCompletionStart="rgba(37, 236, 173, 1)"
          gradientAtCompletionEnd="rgba(19, 184, 255, 1)"
          size={60}
        >
          <img
            className={`completed ${IsExpired ? "completed__fully" : ""}`}
            alt="Check mark"
            src={checkMarkIcon}
          />
        </TimerWheel>
        <TimerWheel
          className="main__timer-wheel"
          totalTime={totalDuration}
          isDisplayedInQuarters={false}
          size={231}
          gradientAtThreeQuartersEnd="rgba(255, 61, 0, 1)"
          gradientAtThreeQuartersStart="rgba(255, 199, 0, 1)"
        >
          <Timer
            expiryDateTime={time}
            onIsExpired={() => setIsExpired(true)}
            IsExpired={IsExpired}
            addStopWatch={true}
          />
        </TimerWheel>
        <img src={bot} className="duration__bot-img" alt="Hypercontext bot" />
      </div>
    </div>
  );
}
