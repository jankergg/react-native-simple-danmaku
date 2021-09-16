import * as React from 'react'
import {
    useEffect,
    useRef,
    useState,
    memo
} from 'react'
import {
    Animated,
    LayoutChangeEvent,
    Easing
} from 'react-native'

import { DanmakuRollItemProps } from './types'


function DanmakuRollItem(props: DanmakuRollItemProps) {
  const rollAnim = useRef(new Animated.Value(0)).current;

  const rollValue = useRef(0);
  const [rollToValue, setRollToValue] = useState(0);

  const init = (event: LayoutChangeEvent) => {
    let width = event.nativeEvent.layout.width;
    let toValue = -props.containerWidth - width;
    setRollToValue(toValue);

    rollAnim.removeAllListeners();
    rollAnim.addListener(({ value }) => {
      props.setRight(Math.abs(value) > width);
      if (value == toValue) props.onEnd();
    });
  };
  useEffect(() => {
    if (!rollToValue) return;
    rollAnim.stopAnimation((value) => {
      rollValue.current = value;
    });
    if (!props.playState) return;
    Animated.timing(rollAnim, {
      toValue: rollToValue,
      duration: (rollValue.current - rollToValue) / (props.speed * props.speed),
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [props.playState, rollToValue, props.speed]);
  return (
    <Animated.View
      onLayout={init}
      style={{
        position: "absolute",
        top: props.initVertical,
        left: props.initLeft,
        transform: [
          {
            translateX: rollAnim,
          },
        ],
        height: 24,
        borderWidth: props.mark ? 1 : 0,
        borderColor: "#777",
        borderRadius: 15,
        backgroundColor: props.color ? props.color : "rgba(0,0,0,0.3)",
        justifyContent: "center",
      }}
    >
      <Animated.Text
        style={{
          color: "#fff",
          fontSize: 14 || props.fontSize,
          fontWeight: "500",
          textShadowRadius: props.shadowHidden ? undefined : 1,
          textShadowColor: props.shadowHidden
            ? undefined
            : `rgba(0,0,0,${props.opacity})`,
          opacity: props.opacity,
        }}
      >
        {props.msg}
      </Animated.Text>
    </Animated.View>
  );
}
export default memo(DanmakuRollItem);
