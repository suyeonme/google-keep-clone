import { useState, useEffect, useRef } from 'react';

export const useClickOutside = initialValue => {
    const [isClickedOutside, setIsClickedOutside] = useState(initialValue);
    const ref = useRef(null);

    const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsClickedOutside(false);
        } else {
            setIsClickedOutside(true);
        };
    };

    const handleResetClick = () => setIsClickedOutside(initialValue);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    return { ref, isClickedOutside, handleResetClick };
};
