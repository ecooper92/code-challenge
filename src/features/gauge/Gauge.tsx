import React, { useState, useLayoutEffect } from 'react';

import styles from './Gauge.module.css';
import { Dial } from './Dial';
import { Scale } from './Scale';
import _ from 'lodash';

export interface GaugeProps {
  startValue: number;
  endValue: number;
  stepValue: number;
  value: number;
  startAngle: number;
  endAngle: number;
  updateInterval: number;
}

/**
 * Computes the angle of the provided value.
 */
function GetValueAngle(value: number, startValue: number, endValue: number, startAngle: number, endAngle: number): number
{
    let clampedValue = startValue;
    if (startValue < endValue)
    {
        clampedValue = _.clamp(value, startValue, endValue);
    }
    else if (endValue < startValue)
    {
        clampedValue = _.clamp(value, endValue, startValue);
    }

    return (endAngle - startAngle) * ((clampedValue - startValue) / (endValue - startValue)) + startAngle;
}

export function Gauge(props: GaugeProps) {
  const [valueAngle, setValueAngle] = useState(props.startAngle);

  // Calculate and save the big ticks.
  useLayoutEffect(() => {
    setValueAngle(GetValueAngle(props.value, props.startValue, props.endValue, props.startAngle, props.endAngle));
  }, [props.value, props.startValue, props.endValue, props.startAngle, props.endAngle]);

  // Render
  return (
    <div className={styles.ellipse}>
      <Scale startAngle={props.startAngle} endAngle={props.endAngle} startValue={props.startValue} endValue={props.endValue} stepValue={props.stepValue}/>
      <div className={styles.dial}>
        <Dial angle={valueAngle} interval={props.updateInterval}/>
      </div>
      <div className={styles.logo}/>
    </div>
  );
}
