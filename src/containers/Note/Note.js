import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEditableNote } from '../../store/actions/notes';
import PropTypes from 'prop-types';

import NoteBody from './NoteBody';
import { NoteContainer } from './NoteElements';
import Toolbar from '../../components/Toolbar/Toolbar';
import EditableNote from '../EditableNote/EditableNote';
import Label from '../../components/Label/Label';

//import { addLabel, addNoteLabel } from '../../store/actions/notes';

function Note({ note, isArchived }) {
  const { id, bgColor, label } = note;
  const [isHovered, setIsHovered] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const editableNote = useSelector((state) => state.notes.editableNote);
  const editableNoteID = editableNote && editableNote.id;
  const isClicked = editableNoteID === id;

  const dispatch = useDispatch();
  const handleClick = (e) => {
    console.log(e.target);
    if (
      e.target.nodeName !== 'BUTTON' &&
      e.target.id !== 'checkbox' &&
      e.target.id !== 'label' &&
      !editableNoteID
    ) {
      dispatch(getEditableNote(note));
    }
  };

  return (
    <NoteContainer
      bgColor={bgColor}
      clicked={isClicked ? 1 : 0}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isClicked ? (
        <EditableNote
          note={note}
          clicked={isClicked ? 1 : 0}
          isArchived={isArchived}
        />
      ) : (
        <NoteBody
          note={note}
          clicked={isClicked ? 1 : 0}
          isHovered={isHovered}
          isArchived={isArchived}
        />
      )}
      {showLabel && <Label id={id} />}
      <Toolbar
        id={id}
        onHover={isHovered}
        isArchived={isArchived}
        setShowLabel={setShowLabel}
        ///
        label={label}
      />
    </NoteContainer>
  );
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  isArchived: PropTypes.bool,
};

export default React.memo(Note);

// function Note({ note, isArchived }) {
//   const { id, bgColor } = note;
//   const [isHovered, setIsHovered] = useState(false);
//   const [showLabel, setShowLabel] = useState(false);

//   const editableNote = useSelector((state) => state.notes.editableNote);
//   const editableNoteID = editableNote && editableNote.id;
//   const isClicked = editableNoteID === id;

//   const dispatch = useDispatch();
//   const handleClick = (e) => {
//     console.log(e.target);
//     if (
//       e.target.nodeName !== 'BUTTON' &&
//       e.target.id !== 'checkbox' &&
//       e.target.id !== 'label' &&
//       !editableNoteID
//     ) {
//       dispatch(getEditableNote(note));
//     }
//   };

//   //////// Label
//   const labels = useSelector((state) => state.notes.labels);
//   const [label, setLabel] = useState('');

//   const clearLabel = () => setLabel('');
//   const addLabelToNote = (id, label) => dispatch(addNoteLabel(id, label));

//   const handleChange = (label) => setLabel(label);

//   const handleClickLabel = (label) => {
//     dispatch(addLabel(label));
//     clearLabel();
//   };

//   ////////

//   return (
//     <NoteContainer
//       bgColor={bgColor}
//       clicked={isClicked ? 1 : 0}
//       onClick={handleClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {isClicked ? (
//         <EditableNote
//           note={note}
//           clicked={isClicked ? 1 : 0}
//           isArchived={isArchived}
//         />
//       ) : (
//         <NoteBody
//           note={note}
//           clicked={isClicked ? 1 : 0}
//           isHovered={isHovered}
//           isArchived={isArchived}
//         />
//       )}
//       {showLabel && (
//         <Label
//           onChange={handleChange}
//           onClick={handleClickLabel}
//           labels={labels}
//           label={label}

//           id={id}
//           onAdd={addLabelToNote}
//         />
//       )}
//       <Toolbar
//         id={id}
//         onHover={isHovered}
//         isArchived={isArchived}
//         setShowLabel={setShowLabel}
//         ///
//         label={label}
//       />
//     </NoteContainer>
//   );
// }

// Note.propTypes = {
//   note: PropTypes.object.isRequired,
//   isArchived: PropTypes.bool,
// };

// export default React.memo(Note);
