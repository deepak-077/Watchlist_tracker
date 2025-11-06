"use client";

import NumberFlow from "@number-flow/react";
import React, { useEffect, useState } from "react";

const Clock = () => {
  return (
    <section className="relative w-[550px] h-[300px] flex items-center justify-center bg-[#f5f4f3] text-black rounded-4xl">
      <AnimatedClock />
    </section>
  );
};

const AnimatedClock = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setHours(now.getHours());
      setMinutes(now.getMinutes());
      setSeconds(now.getSeconds());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex font-bebas-neue text-[10vw] tracking-tight">
        <NumberFlow value={hours} />
        <span className="relative top-[25px]">:</span>
        <NumberFlow value={minutes} />
        <span className="relative top-[25px]">:</span>
        <NumberFlow value={seconds} />
      </div>
      <p className="text-lg text-gray-600">Current Time</p>
    </div>
  );
};

export { Clock };
