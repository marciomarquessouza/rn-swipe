import React, { Component, JSXElementConstructor } from 'react';
import { CardItem } from '../types';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  View,
  StyleSheet
} from 'react-native';

const SCREEN_WIDTH: number = Dimensions.get('window').width;
const SWIPE_THRESHOLD: number = SCREEN_WIDTH * 0.25;
const SWIPE_DURATION: number = 250;

interface DeckProps {
  data: CardItem[];
  renderCard(item: CardItem): JSX.Element;
  renderNoMoreCard(): JSX.Element;
  onSwipeRight(item: CardItem): void;
  onSwipeLeft(item: CardItem): void;
}

interface DeckState {
  panResponder: PanResponderInstance;
  position: Animated.ValueXY;
  index: number;
}

enum Direction {
  RIGHT = 1,
  LEFT = -1
}

export class Deck extends Component<DeckProps, DeckState> {

  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {}
  }

  constructor(props: DeckProps) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (
        event: GestureResponderEvent,
        gesture: PanResponderGestureState
      ) => {
          position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (
          event: GestureResponderEvent,
          gesture: PanResponderGestureState
      ) => {
        if (gesture.dx < -SWIPE_THRESHOLD) {
          return this.forceSwipe(Direction.LEFT)
        }

        if (gesture.dx > SWIPE_THRESHOLD) {
          return this.forceSwipe(Direction.RIGHT);
        }

        this.resetPosition();
      }
    });
    this.state = {
      panResponder,
      position,
      index: 0
    }
  }

  com

  resetPosition(): void {
    Animated.spring(this.state.position, {
      toValue: {
        x: 0,
        y: 0
      }
    }).start();
  }

  forceSwipe(direction: Direction): void {
    Animated.timing(this.state.position, {
      toValue: { x: SCREEN_WIDTH * direction, y: 0},
      duration: SWIPE_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction: Direction): void {
    const { data, onSwipeLeft, onSwipeRight } = this.props;
    const item: CardItem = data[this.state.index];
    direction === Direction.RIGHT ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0});
    this.setState({ index: this.state.index + 1})
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
      ...this.state.position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards(): (JSX.Element | JSX.Element[]) {

    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCard();
    }

    return this.props.data.map((item: CardItem, index: number): JSX.Element => {
      if (index < this.state.index) return null;

      if (index === this.state.index) {
        return (
          <Animated.View
            key = { item.id }
            style = { [ styles.cardStyle, this.getCardStyle(), { zIndex: 99 } ] } 
            { ...this.state.panResponder.panHandlers }
          >
            { this.props.renderCard(item) }
          </Animated.View>
        )
      }

      return ( 
        <Animated.View
          key = { item.id }
          style={[styles.cardStyle, { top: 10 * (index - this.state.index), zIndex: 5 }]}
        >
          { this.props.renderCard(item) }
        </Animated.View>
      )
    }).reverse()
  }

  render() {
    return (
      <View>
        { this.renderCards() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
})