import React, { useRef } from 'react';
import { useDrag, useDrop, XYCoord, DropTargetMonitor } from 'react-dnd';
import styled from 'styled-components';

import { ItemTypes } from 'shared/dnd';

const Wrapper = styled('div')<{ isdragging: number }>`
  opacity: ${(props) => (props.isdragging ? 0.3 : 1)};
`;

interface DraggableProps {
  handleMove: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  id: number | string;
  children: React.ReactNode;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Draggable = ({ children, handleMove, index, id }: DraggableProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.TODOITEM,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex: number = item.index;
      const hoverIndex: number = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY: number =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: XYCoord = monitor.getClientOffset()!;
      const hoverClientY: number = clientOffset.y - hoverBoundingRect.top;

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
    collect: (monitor: any) => ({
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

export default React.memo(Draggable);
