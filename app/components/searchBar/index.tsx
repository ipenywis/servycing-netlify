import React, { useRef, useEffect, useState } from 'react';
import styled, { theme } from 'styles/styled-components';
import { Input } from 'components/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { InputTheme } from 'components/input/themes';
import { useHistory } from 'react-router-dom';

export interface ISearchBarProps {
  onSearch?: (keyword: string) => void;
  onChange?: (keyword: string) => void;
  onClearInput?: () => void;

  defaultValue?: string;
  updateQueryOnURL?: boolean;
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1em;
`;

const SearchInput = styled(Input)`
  min-width: 200px;
  height: 36px;
  width: 100%;
  border-radius: 0;
  padding: 0 2.1em;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  font-size: 13px;
  color: ${theme.default.mutedText};
  top: 50%;
  transform: translateY(-50%);
  right: 4.1em;
  cursor: pointer;
  transition: opacity 300ms ease-in-out;
  z-index: 1;

  &:hover {
    opacity: 0.6;
  }
`;

const SearchIconContainer = styled.div`
  position: absolute;
  opacity: 0.7;
  font-size: 13px;
  color: ${theme.default.mutedText};
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
  z-index: 1;
`;

const SearchButton = styled.button`
  width: 45px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: 0;
  background-color: ${theme.default.primary};
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  box-shadow: none;

  &:hover {
    background-color: ${theme.default.primaryDark};
  }

  &:focus {
    outline: none;
  }
`;

export function SearchBar(props: ISearchBarProps) {
  const { updateQueryOnURL, defaultValue } = props;

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isInputEmpty, setInputEmpty] = useState(true);

  const history = useHistory();

  const setQueryOnUrl = (query: string) => {
    const urlSearchParams = new URLSearchParams(history.location.search);
    urlSearchParams.set('q', query);
    urlSearchParams.delete('page');
    history.push({
      search: urlSearchParams.toString(),
    });
  };

  const clearQueryOnUrl = () => {
    const urlSearchParams = new URLSearchParams(history.location.search);
    urlSearchParams.delete('q');
    history.push({
      search: urlSearchParams.toString(),
    });
  };

  const onSearchClick = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (props.onSearch) {
      if (searchInputRef.current) {
        searchInputRef.current.blur();
        let keyword = searchInputRef.current.value;
        if (keyword) keyword = keyword.trim();
        props.onSearch(keyword);
        if (updateQueryOnURL) setQueryOnUrl(keyword);
      } else {
        props.onSearch('');
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    if (keyword && keyword.length > 0) setInputEmpty(false);
    else setInputEmpty(true);

    if (props.onChange) {
      props.onChange(keyword);
    }
  };

  const onClearInput = () => {
    if (searchInputRef.current) searchInputRef.current.value = '';
    setInputEmpty(true);
    if (updateQueryOnURL) clearQueryOnUrl();
    props.onClearInput && props.onClearInput();
  };

  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setInputEmpty(false);
    }
  }, [defaultValue]);

  return (
    <form onSubmit={onSearchClick}>
      <SearchBarContainer>
        <SearchIconContainer>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIconContainer>
        <SearchInput
          inputTheme={InputTheme.PRIMARY_BORDER}
          placeholder="Search for courses"
          clearPlaceholderOnFocus
          inputRef={searchInputRef}
          onChange={onChange}
          defaultValue={defaultValue}
        />
        {!isInputEmpty && (
          <CloseIconContainer onClick={onClearInput}>
            <FontAwesomeIcon icon={faTimes} size="sm" />
          </CloseIconContainer>
        )}
        <SearchButton onClick={onSearchClick} type="submit">
          <FontAwesomeIcon icon={faSearch} size="sm" />
        </SearchButton>
      </SearchBarContainer>
    </form>
  );
}
