import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

import searchIcon from 'icons/search.svg';
import cancelIcon from 'icons/close.svg';
import { getSearchQuery } from 'store/actions/view';
import useFirstRender from 'hooks/useFirstRender';
import { useClickOutside } from 'hooks/useClickOutside';
import { ToolSpan } from 'containers/Toolbar/Tool/ToolElements';

const Form = styled('form')<{ isshow: number }>`
  position: relative;
  width: 40%;
  height: 4.5rem;
  background-color: #f1f3f4;
  border-radius: 0.8rem;

  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 576px) {
    position: absolute;
    right: 7rem;
    width: ${(props) => (props.isshow ? 'calc(100% - 90px)' : '20%')};
    background-color: ${(props) => (props.isshow ? '#f1f3f4' : 'white')};
  }
`;

const Input = styled('input')<{ isshow: number }>`
  width: 100%;
  height: 100%;
  padding: 0 5rem;
  font-size: 1.6rem;
  background-color: inherit;
  border-radius: 0.8rem;
  border: 1px solid transparent;
  transition: background 100ms ease-in, width 100ms ease-out;

  @media (max-width: 576px) {
    display: ${(props) => (props.isshow ? 'inline-block' : 'none')};
    background-color: #f1f3f4;
    padding: 0 1rem;
  }

  &:focus {
    background: white;
    box-shadow: 0 1px 5px rgb(138, 137, 137);
    outline: none;
  }
`;

const Button = styled('button')<{ isshow: number }>`
  position: absolute;
  left: 1.7rem;
  top: 50%;
  transform: translateY(-50%);
  background: url(${searchIcon}) no-repeat;
  background-size: cover;
  width: 1.7rem;
  height: 1.7rem;
  z-index: 300;

  @media (max-width: 576px) {
    width: 2rem;
    height: 2rem;
    right: 1rem;
    left: auto;
    background: ${(props) =>
      props.isshow
        ? `url(${cancelIcon}) no-repeat center center`
        : `url(${searchIcon}) no-repeat center center`};
    background-size: cover;
  }
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();

  const isFirstRender: boolean = useFirstRender();
  const { ref, isClickOutside: isClickForm } = useClickOutside(true);

  useEffect(() => {
    if (!isFirstRender) {
      const timeout = setTimeout(() => {
        dispatch(getSearchQuery(query));
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [query, dispatch, isFirstRender]);

  useEffect(() => {
    // Hide search form when click outside form on mobile
    const isMobile: boolean = /Mobi/i.test(window.navigator.userAgent);
    if (isMobile && !isClickForm) setShowInput(false);
  }, [isClickForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setQuery(e.target.value);
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    setShowInput(!showInput);
  };

  return (
    <Form isshow={showInput ? 1 : 0} ref={ref}>
      <Tooltip title={<ToolSpan>Search</ToolSpan>}>
        <Button onClick={handleClick} isshow={showInput ? 1 : 0} />
      </Tooltip>
      <Input
        type="search"
        value={query}
        placeholder="Search"
        autoComplete="off"
        onChange={handleChange}
        isshow={showInput ? 1 : 0}
      />
    </Form>
  );
};

export default React.memo(SearchBar);
