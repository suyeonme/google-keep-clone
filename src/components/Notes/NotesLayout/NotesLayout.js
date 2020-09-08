import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';

import './NotesLayout.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const NotesContainer = styled.div`
  margin: 30px 0;
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: #5f6368;
  margin-left: 135px;
  padding: 8px;
`;

function NotesLayout({ notes, title }) {
  return (
    <NotesContainer>
      {title && <Title>{title}</Title>}
      <Masonry breakpointCols={5} className="grid" columnClassName="col">
        {notes}
      </Masonry>
      <Backdrop />
    </NotesContainer>
  );
}

export default NotesLayout;
