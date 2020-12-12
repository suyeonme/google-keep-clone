import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ItemTypes } from 'shared/dnd';

const Wrapper = styled.div`
  opacity: ${(props) => (props.isdragging ? 0.3 : 1)};
`;

const Draggable = ({ children, handleMove, index, id }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.TODOITEM,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      handleMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.TODOITEM, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Wrapper ref={ref} isdragging={isDragging ? 1 : 0}>
      {children}
    </Wrapper>
  );
};

Draggable.propTypes = {
  handleMove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default React.memo(Draggable);
