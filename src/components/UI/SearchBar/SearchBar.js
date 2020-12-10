import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import searchIcon from 'icons/search.svg';
import { getSearchQuery } from 'store/actions/view';
import useFirstRender from 'hooks/useFirstRender';

// Show input on mobile when click icon

const Form = styled.form`
  position: relative;
  width: 40%;
  height: 4.5rem;
  background-color: #f1f3f4;
  border-radius: 0.8rem;

  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 576px) {
    background-color: white;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0 5rem;
    font-size: 1.6rem;
    background-color: inherit;
    border-radius: 0.8rem;
    border: 1px solid transparent;
    transition: background 100ms ease-in, width 100ms ease-out;

    @media (max-width: 576px) {
      padding: 0;
      display: none;
      ${'' /* display: ${(props) => (props.showinput ? 'block' : 'none')}; */}
    }

    &:focus {
      background: white;
      box-shadow: 0 1px 5px rgb(138, 137, 137);
      outline: none;
    }
  }

  img {
    position: absolute;
    left: 1.7rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.7rem;
    height: 1.7rem;

    @media (max-width: 576px) {
      right: 2rem;
      left: auto;
      width: 2rem;
      height: 2rem;
    }
  }
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();
  const isFirstRender = useFirstRender();

  useEffect(() => {
    if (!isFirstRender) {
      const timeout = setTimeout(() => {
        dispatch(getSearchQuery(query));
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [query, dispatch, isFirstRender]);

  const handleChange = (e) => setQuery(e.target.value);
  const handleClick = (e) => {
    e.preventDefault();
    setShowInput(!showInput);
  };

  return (
    <Form>
      <button onClick={handleClick}>
        <img src={searchIcon} alt="Search" />
      </button>
      <input
        type="text"
        value={query}
        placeholder="Search"
        autoComplete="off"
        onChange={handleChange}
        // showinput={showInput.toString()}
        // showinput={showInput ? 1 : 0}
      />
    </Form>
  );
};

export default React.memo(SearchBar);
