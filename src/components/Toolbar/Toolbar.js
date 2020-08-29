import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Tool from './Tool';
import ColorPalette from '../ColorPalette/ColorPalette';
import TranshCanIcon from '../../icons/trash-can.svg';
import PaintIcon from '../../icons/paintbrush.svg';
import PictureIcon from '../../icons/picture.svg';
import CheckboxIcon from '../../icons/checkbox.svg';
import { updateEditableNote } from '../../store/actions/notes';

const ToolbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  margin-top: 20px;
  line-height: 0;
  opacity: ${(props) => (props.hovered ? 1 : 0)};
  transition: opacity 0.3s ease-out;
`;

const CloseBtn = styled.button`
  background: transparent;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
  font-size: 1.5rem;
  padding: 8px 24px;
  border-radius: 4px;
  letter-spacing: 0.4px;

  &:hover {
    opacity: 0.87;
    background: rgba(95, 99, 104, 0.157);
  }
`;

function Toolbar({ id, isInputField, onHover, onAddNote, onCheck }) {
  const [isHoverColorPalette, setIsHoverColorPalette] = useState(false);
  const icons = [
    {
      icon: PaintIcon,
      title: 'Change Color',
    },
    {
      icon: PictureIcon,
      title: 'Add Picture',
    },
    {
      icon: CheckboxIcon,
      title: 'Show Checkbox',
    },
  ];

  const editedNote = useSelector((state) => state.editableNote);

  const dispatch = useDispatch();
  const handleShowColorPalette = () => setIsHoverColorPalette(true);
  const handleHideColorPalette = () => setIsHoverColorPalette(false);
  const handleUpdateEditableNote = () => {
    if (editedNote !== null) {
      dispatch(updateEditableNote());
    }
  };

  return (
    <ToolbarContainer hovered={onHover}>
      <div>
        {icons.map((icon, i) => (
          <Tool
            id={id}
            key={i}
            title={icon.title}
            bgImage={icon.icon}
            showPalette={
              icon.title === 'Change Color' ? handleShowColorPalette : null
            }
            hidePalette={
              icon.title === 'Change Color' ? handleHideColorPalette : null
            }
            /////
            onCheck={onCheck}
            isInputField={isInputField}
          />
        ))}
        {!isInputField && (
          <Tool title="Delete Note" bgImage={TranshCanIcon} id={id} />
        )}
      </div>
      {isInputField && <CloseBtn onClick={onAddNote}> Close </CloseBtn>}
      {editedNote && (
        <CloseBtn onClick={handleUpdateEditableNote}> Close </CloseBtn>
      )}
      {isHoverColorPalette && (
        <ColorPalette
          id={id}
          isInputField={isInputField}
          onUnHover={handleHideColorPalette}
          onHover={handleShowColorPalette}
        />
      )}
    </ToolbarContainer>
  );
}

export default Toolbar;

// function Toolbar({ id, isInputField, onHover, onAddNote }) {
//   const [isHoverColorPalette, setIsHoverColorPalette] = useState(false);
//   const icons = [
//     {
//       icon: PaintIcon,
//       title: 'Change Color',
//     },
//     {
//       icon: PictureIcon,
//       title: 'Add Picture',
//     },
//     {
//       icon: CheckboxIcon,
//       title: 'Show Checkbox',
//     },
//   ];

//   const editedNote = useSelector((state) => state.editableNote);

//   const dispatch = useDispatch();
//   const handleShowColorPalette = () => setIsHoverColorPalette(true);
//   const handleHideColorPalette = () => setIsHoverColorPalette(false);
//   const handleUpdateEditableNote = () => {
//     if (editedNote !== null) {
//       dispatch(updateEditableNote());
//     }
//   };

//   return (
//     <ToolbarContainer hovered={onHover}>
//       <div>
//         {icons.map((icon, i) => (
//           <Tool
//             id={id}
//             key={i}
//             title={icon.title}
//             bgImage={icon.icon}
//             showPalette={
//               icon.title === 'Change Color' ? handleShowColorPalette : null
//             }
//             hidePalette={
//               icon.title === 'Change Color' ? handleHideColorPalette : null
//             }
//           />
//         ))}
//         {!isInputField && (
//           <Tool title="Delete Note" bgImage={TranshCanIcon} id={id} />
//         )}
//       </div>
//       {isInputField && <CloseBtn onClick={onAddNote}> Close </CloseBtn>}
//       {editedNote && (
//         <CloseBtn onClick={handleUpdateEditableNote}> Close </CloseBtn>
//       )}
//       {isHoverColorPalette && (
//         <ColorPalette
//           id={id}
//           isInputField={isInputField}
//           onUnHover={handleHideColorPalette}
//           onHover={handleShowColorPalette}
//         />
//       )}
//     </ToolbarContainer>
//   );
// }

// export default Toolbar;
