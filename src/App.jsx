/* eslint-disable react/prop-types */
// import './App.css'
import styles from './App.module.css';
import * as React from 'react';
import axios from 'axios';
import Check from './assets/check.svg?react';


const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';


const storiesReducer = (state, action) => {
  console.log('state = ', state);
  console.log('action.payload: ', action.payload);
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};



const App = () => {

  console.log('App renders');

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );


  const handleFetchStories = React.useCallback(async () => {
    try {
      const result = await axios.get(url);
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });

    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);


  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.headlinePrimary}>My Hacker Stories</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      {
        stories.isLoading ? (
          <p>Loading ...</p>
        ) : (
          <>
            <p>
              Searching for <strong>{searchTerm}</strong>
            </p>

            <hr />

            <List
              list={stories.data}
              onRemoveItem={handleRemoveStory}
            />
          </>
        )
      }
    </div>
  );
};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit} className={styles.searchForm}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>
    <button
      type="submit"
      disabled={!searchTerm}
      className={`${styles.button} ${styles.buttonLarge}`}
    >
      Submit
    </button>
  </form>
);


const InputWithLabel = ({
  id,
  value,
  type = 'text',
  isFocused,
  onInputChange,
  children
}) => {
  console.log('Input renders');

  const inputRef = React.useRef();
  React.useEffect(() => {
    console.log("IsFocused = " + isFocused);
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
      console.log(inputRef.current)
    }
  }, [isFocused]);

  return (
    <>
      <label
        htmlFor={id}
        className={styles.label}
      >
        {children}
      </label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
        className={styles.inputMy}
      />
    </>
  );
};


const List = ({ list, onRemoveItem }) => {
  console.log('List renders');

  return (
    <ul>
      {list.map((item) => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ul>
  );
};

const Item = ({ item, onRemoveItem }) => {
  return (
    <li className={styles.item}>
      <span style={{ width: '40%' }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%' }}>{item.author}</span>
      <span style={{ width: '10%' }}>{item.num_comments}</span>
      <span style={{ width: '10%' }}>{item.points}</span>

      <span style={{ width: '10%' }}>
        <button
          type="button"
          onClick={() => onRemoveItem(item)}
          className={`${styles.button} ${styles.buttonSmall}`}>
          <Check height="18px" width="18px" />
        </button>
      </span>

    </li >
  );
};


export default App
