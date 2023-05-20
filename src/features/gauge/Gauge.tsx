import React, { useState, useLayoutEffect } from 'react';

import styles from './Gauge.module.css';
import { Dial } from '../dial/Dial';
import _ from 'lodash';

export interface GaugeProps {
    startValue: number;
    endValue: number;
    value: number;
    startAngle: number;
    endAngle: number;
    updateInterval: number;
}

/**
 * Create an array of numbers between the values start and end.
 */
function GetRange(start: number, end: number, offset = 1, step = 1): number[] {
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
function GetAngleDelta(startValue: number, endValue: number, startAngle: number, endAngle: number)
{
    return Math.abs((endAngle - startAngle) / (endValue - startValue));
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
    const [bigTicks, setBigTicks] = useState<JSX.Element[]>();
    const [smallTicks, setSmallTicks] = useState<JSX.Element[]>();
    
    // Calculate and save the big ticks.
    useLayoutEffect(() => {
        setValueAngle(GetValueAngle(props.value, props.startValue, props.endValue, props.startAngle, props.endAngle));
    }, [props.value, props.startValue, props.endValue, props.startAngle, props.endAngle]);

    // Calculate and save the big ticks.
    useLayoutEffect(() => {
        const angleDelta = GetAngleDelta(props.startValue, props.endValue, props.startAngle, props.endAngle);
        const range = GetRange(props.startValue, props.endValue);
        setBigTicks(range.map((v, i) => {
            const rotationAngle = props.startAngle + i * angleDelta;
            return (
                <div>
                    <div className={styles.bigTick} style={{ transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translate(0px, calc((var(--big-tick-height) / 2) - (var(--gauge-diameter) / 2)))`}}/>
                    <div className={styles.numbers} style={{ transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translate(0px, calc((var(--gauge-diameter) / -2) + var(--big-tick-height) * 2)) rotate(${-rotationAngle}deg)`}}>{v}</div>
                </div>
            )
        }));
    }, [props.startValue, props.endValue, props.startAngle, props.endAngle]);
    
    // Calculate and save the small ticks.
    useLayoutEffect(() => {
        const angleDelta = GetAngleDelta(props.startValue, props.endValue, props.startAngle, props.endAngle);
        const range = GetRange(props.startValue, props.endValue, 0);
        setSmallTicks(range.map((v, i) => angleDelta * i).map((v, i) =>
            <div className={styles.smallTick} style={{ transform: `translate(-50%, -50%)  rotate(${props.startAngle + v + (angleDelta / 2)}deg) translate(0px, calc((var(--small-tick-height) / 2) - (var(--gauge-diameter) / 2)))`}}/>
        ));
    }, [props.startValue, props.endValue, props.startAngle, props.endAngle]);

    // Render
    return (
        <div className={styles.ellipse}>
            {bigTicks}
            {smallTicks}
            <div className={styles.dial}>
                {<Dial angle={valueAngle} interval={props.updateInterval}/>}
            </div>
            <div className={styles.logo}/>
        </div>
    );
  }

  

Gauge.defaultProps = {
    updateInterval: 1000
};