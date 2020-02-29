import React, { useState } from 'react';

import { MdMoreHoriz } from 'react-icons/md';
import { Container, Badge, Options, List } from './styles';

export default function Notificatios() {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <MdMoreHoriz />
      </Badge>
      <List visible={visible}>
        <Options />
      </List>
    </Container>
  );
}
