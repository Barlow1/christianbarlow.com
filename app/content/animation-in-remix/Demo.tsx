import React, { useEffect, useState } from "react";
import { useTransition, config } from "@react-spring/core";
import { animated } from "@react-spring/web";

function Demo() {
  const [show, setShow] = useState(true);
  const [selected, setSelected] = useState(0);
  const items = [5, 4, 3, 2, 1, 0];

  useEffect(() => {
    if (selected < 5) {
      setTimeout(() => {
        setSelected(selected + 1);
      }, 1000);
    } else {
      setShow(false);
    }
  }, [selected]);

  const transition = useTransition(show, {
    from: {
      display: "inline-block",
      opacity: 1,
      transform: "translate3d(0,-50px,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-50px,0)" },
    color: "white",
    config: config.molasses,
  });

  const rocketTransition = useTransition(!show, {
    from: {
      opacity: 0,
      transform: "translate3d(0,100px,0)",
      display: "inline-block",
    },
    enter: { opacity: 1, transform: "translate3d(0,10px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,100px,0)" },
    config: config.molasses,
  });

  return (
    <div style={{height: '150px'}}>
      <div>
        {transition(
          ({ opacity, transform }, item) =>
            item && (
              <animated.div
                className="pl-5"
                style={{
                  color: "white",
                  fontSize: "50px",
                  opacity: opacity,
                  transform: transform,
                  // this will reduce any snappy animations
                  position: "absolute",
                }}
                key={"countdown1"}
              >
                {items[selected]}
              </animated.div>
            )
        )}
        {rocketTransition(
          ({ opacity, transform }, item) =>
            item && (
              <animated.div
                style={{
                  opacity: opacity,
                  transform: transform,
                  position: "absolute",
                }}
              >
                <h3 className="inline">Blast off!</h3>
                <img
                  aria-label="rocket"
                  src="/rocket.png"
                  className="w-10 h-10 md:w-14 md:h-14"
                ></img>
              </animated.div>
            )
        )}
      </div>
      {!show && (
        <div style={{ position: "absolute" }} className="pt-10 pl-28">
          <button
            onClick={() => {
              setSelected(0);
              setShow(true);
            }}
          >
            Click to relaunch
          </button>
        </div>
      )}
    </div>
  );
}
export default Demo;
