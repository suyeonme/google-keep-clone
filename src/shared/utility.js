import { useState, useEffect, useRef } from 'react';

export const useClickOutside = initialValue => {
    const [isClickedOutside, setIsClickedOutside] = useState(initialValue);
    const ref = useRef(null);

    const handleClickOutside = e => {
        (ref.current && !ref.current.contains(e.target)) ? 
            setIsClickedOutside(false) : 
            setIsClickedOutside(true);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    return { ref, isClickedOutside, setIsClickedOutside };
};
