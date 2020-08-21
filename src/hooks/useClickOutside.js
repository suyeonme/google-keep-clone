import { useState, useEffect, useRef } from 'react';

export const useClickOutside = (initialValue) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleResetClick = () => setIsOpen(initialValue);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return {
    ref,
    isOpen,
    handleResetClick,
  };
};
