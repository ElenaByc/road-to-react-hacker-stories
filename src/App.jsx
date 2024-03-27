/* eslint-disable react/prop-types */
import './App.css'
import * as React from 'react';

const App = () => {

  console.log('App renders');

  const [searchTerm, setSearchTerm] = React.useState('React');

  const handleSearch = (event) => {
    console.log("In App!");
    setSearchTerm(event.target.value);
  };

  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ];

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>

      <hr />
      <List list={searchedStories} />

    </>
  )
};

const Search = ({ search, onSearch }) => {
  console.log('Search renders');

  return (
    <>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={onSearch}
      />
    </>
  );
};

const List = ({ list }) => {
  console.log('List renders');

  return (
    <ul>
      {list.map(({ objectID, ...item }) => (
        <Item key={objectID}  {...item} />
      ))}
    </ul>
  );
};

const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url}>{title}</a>&nbsp;
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);


export default App
