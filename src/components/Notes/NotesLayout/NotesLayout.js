import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import PropTypes from 'prop-types';
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
`;

const breakPointCol = {
  default: 5,
  1200: 4,
  1024: 3,
  768: 2,
  576: 1,
};

function NotesLayout({ notes, title }) {
  return (
    <NotesContainer>
      {title && <Title>{title}</Title>}
      <Masonry
        breakpointCols={breakPointCol}
        className="grid"
        columnClassName="col"
      >
        {notes}
      </Masonry>
    </NotesContainer>
  );
}

NotesLayout.propTypes = {
  notes: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default React.memo(NotesLayout);
