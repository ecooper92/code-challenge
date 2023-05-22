import React, { useState, useLayoutEffect } from 'react';

import styles from './Scale.module.css';
import _ from 'lodash';

export interface ScaleProps {
  startValue: number;
  endValue: number;
  stepValue: number;
  startAngle: number;
  endAngle: number;
}

/**
 * Create an array of numbers between the values start and end.
 */
function GetRange(start: number, end: number, step: number, offset = 1): number[] {
  if (start === end) {
    return [];
  }
  else if (start < end) {
    return _.range(start, end + offset, step);
  }
  else {
    return _.range(start, end - offset, -step);
  }
}

/**
 * Computes the angle delta between ticks.
 */
function GetAngleDelta(startValue: number, endValue: number, stepValue: number, startAngle: number, endAngle: number)
{
  return Math.abs((endAngle - startAngle) / ((endValue - startValue) / stepValue));
}

export function Scale(props: ScaleProps) {
  const [bigTicks, setBigTicks] = useState<JSX.Element[]>();
  const [smallTicks, setSmallTicks] = useState<JSX.Element[]>();

  // Calculate and save the ticks.
  useLayoutEffect(() => {
    const angleDelta = GetAngleDelta(props.startValue, props.endValue, props.stepValue, props.startAngle, props.endAngle);
    const bigRange = GetRange(props.startValue, props.endValue, props.stepValue);
    setBigTicks(bigRange.map((v, i) => {
      const rotationAngle = props.startAngle + i * angleDelta;
      return (
        <div>
          <div className={styles.bigTick} style={{ transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translate(0px, calc((var(--big-tick-height) / 2) - (var(--gauge-diameter) / 2)))`}}/>
          <div className={styles.numbers} style={{ transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translate(0px, calc((var(--gauge-diameter) / -2) + var(--big-tick-height) * 2)) rotate(${-rotationAngle}deg)`}}>{v}</div>
        </div>
      )
    }));
    
    const smallRange = GetRange(props.startValue, props.endValue, props.stepValue, 0);
    setSmallTicks(smallRange.map((v, i) => angleDelta * i).map((v, i) =>
      <div className={styles.smallTick} style={{ transform: `translate(-50%, -50%)  rotate(${props.startAngle + v + (angleDelta / 2)}deg) translate(0px, calc((var(--small-tick-height) / 2) - (var(--gauge-diameter) / 2)))`}}/>
    ));
  }, [props.startValue, props.endValue, props.stepValue, props.startAngle, props.endAngle]);

  // Render
  return (
    <div>
      {bigTicks}
      {smallTicks}
    </div>
  );
}
