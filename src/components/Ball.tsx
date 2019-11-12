import React, { Component } from "react";
import { Animated, StyleSheet, View } from 'react-native';

interface BallProps {};

interface BallState {
  position: Animated.ValueXY;
}

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    color: 'black'
  }
});

export class Ball extends Component<BallProps, BallState> {

  constructor(props: BallProps) {
    super(props);
    this.state = {
      position: new Animated.ValueXY()
    }
    Animated.spring(this.state.position, {
      toValue: {
        x: 200,
        y: 500
      }
    }).start()
  }

  render() {
    return (
      <Animated.View style = { this.state.position.getLayout() }>
        <View style = { styles.ball }></View>
      </Animated.View>
    );
  }
};
