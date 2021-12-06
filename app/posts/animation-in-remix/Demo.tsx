import React, { useEffect, useState } from "react";
import { useTransition, config } from "@react-spring/core";
import { animated } from "@react-spring/web";

function Demo() {
  const NUM_TRANS = [...Array(6).keys()].reverse().slice(0, -1);
  const [items, setItems] = useState(NUM_TRANS);

  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      transform: "translate3d(0,-40px,0)",
      display: "inline-block",
    },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    trail: items.length ? 1000 : 0,
    config: config.molasses,
  });

  const rocketTransition = useTransition(true, {
    from: {
      opacity: 0,
      transform: "translate3d(0,100px,0)",
      display: "inline-block",
    },
    enter: { opacity: 1, transform: "translate3d(0,10px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,100px,0)" },
    config: config.molasses,
    delay: 5000,
  });

  return (
    <div className="flex">
      <div className="flex">
        {transitions(({ opacity, transform }, item) => (
          <animated.div
            style={{
              opacity: opacity,
              transform: transform,
            }}
          >
            <h1 className="px-5">{item}</h1>
          </animated.div>
        ))}
      </div>
      <div>
        {rocketTransition(({ opacity, transform }) => (
          <animated.div
            style={{
              opacity: opacity,
              transform: transform,
            }}
          >
            <h3 className="inline">Blast off!</h3>
            <img
              aria-label="rocket"
              src="/rocket.png"
              className="w-10 h-10 md:w-14 md:h-14"
            ></img>
          </animated.div>
        ))}
      </div>
    </div>
  );
}
export default Demo;
