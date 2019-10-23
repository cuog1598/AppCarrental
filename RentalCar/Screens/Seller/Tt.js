import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import Aa from './Tab1';
import Tab2 from './Tab2';

export default class TabsScrollableExample extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs/>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Tab1">
            <Aa />
          </Tab>
          <Tab heading="Tab2">
            <Tab2 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}