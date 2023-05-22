import React from 'react';
import styles from './Dial.module.css';
import _ from 'lodash';

export interface DialProps
{
  angle: number;
  interval: number;
}

export function Dial(props: DialProps) {
  return (
    <div className={styles.ellipse} style={_.merge({}, { transform: `rotate(${props.angle}deg)` }, { transitionDuration: `${props.interval}ms`})}>
      <div className={styles.dial}/>
    </div>
  );
}
