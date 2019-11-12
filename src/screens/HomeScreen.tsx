import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Deck } from '../components/Deck';
import { CardItem } from '../types';
import { Button, Card, Paragraph } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

interface HomeProps {}

interface HomeState {}

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

export class HomeScreen extends Component<HomeProps, HomeState> {

  renderCard(item: CardItem): JSX.Element {
    return (
      <Card key = { item.id }>
        <Card.Title title = { item.text } />
        <Card.Cover source = { {uri: item.uri} } />
        <Card.Content>
          <Paragraph>A Text wich will be changed.</Paragraph>
          <Button 
            icon = "code-braces"
            mode = "contained"
            color = "#03A9F4"
          >
            View Now
          </Button> 
        </Card.Content>
      </Card>
    );
  }

  renderNoMoreCard(): JSX.Element {
    return (
      <Card>
        <Card.Title title = "All Done!" />
        <Card.Content>
          <Paragraph>No more cards available.</Paragraph>
          <Button 
            icon = "code-braces"
            mode = "contained"
            color = "#03A9F4"
          >
            Get More!
          </Button> 
        </Card.Content>
      </Card>
    )
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Deck
          data = { DATA }
          renderCard = { this.renderCard }
          renderNoMoreCard = { this.renderNoMoreCard }
        />
      </View>
    )
  }
}