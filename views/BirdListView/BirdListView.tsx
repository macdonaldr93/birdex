import React from 'react';

import { Card, Gallery, Page } from '../../components';

export interface BirdListViewProps {
  items: {
    id: string;
    discoveryNumber: number;
    name: string;
    image: string;
  }[];
}

export default function BirdListView({ items }: BirdListViewProps) {
  const itemsMarkup = items.map(item => (
    <Card
      key={item.id}
      title={item.name}
      media={item.image}
      subtitle={`#${('0000' + item.discoveryNumber).substring(
        item.discoveryNumber.toString().length,
      )}`}
    />
  ));

  return (
    <Page.Content>
      <Gallery>{itemsMarkup}</Gallery>
    </Page.Content>
  );
}
