import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import './NotesLayout.css';

const NotesContainer = styled.div`
  margin: 117px 0 30px 0;

  @media (max-width: 576px) {
    margin: 80px 0 30px 0;
  }

  &:last-child {
    margin: 80px 0 30px 0;

    @media (max-width: 576px) {
      margin: 70px 0 30px 0;
    }
  }
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: #5f6368;
  margin-left: 135px;
  padding: 8px;

  @media (max-width: 576px) {
    margin-left: 75px;
  }
`;

interface BreakPoints {
  default: number;
  1200: number;
  1024: number;
  768: number;
  576: number;
}

interface NotesLayout {
  notes: JSX.Element[];
  title?: string;
}

const BREAK_POINTS: BreakPoints = {
  default: 5,
  1200: 4,
  1024: 3,
  768: 2,
  576: 1,
};

const NotesLayout = ({ notes, title }: NotesLayout) => {
  if (notes.length > 0) {
    return (
      <NotesContainer>
        {title && <Title>{title}</Title>}
        <Masonry
          breakpointCols={BREAK_POINTS}
          className="grid"
          columnClassName="col"
        >
          {notes}
        </Masonry>
      </NotesContainer>
    );
  }
  return null;
};

export default React.memo(NotesLayout);
