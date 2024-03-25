/* eslint-disable react/prop-types */
import './App.css'
import * as React from 'react';

const App = () => {

  console.log('App renders');

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

  return (
    <>
      <h1>My Hacker Stories</h1>
      <Search />
      <hr />
      <List list={stories} />

    </>
  )
};

const Search = () => {
  console.log('Search renders');

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    // synthetic event
    console.log(event);
    // value of target (here: input HTML element)
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleOnBlur = (event) => {
    console.log(event);
    console.log(event.target.value);
  }

  return (
    <>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} onBlur={handleOnBlur} />


      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>

    </>
  );
};

const List = (props) => {
  console.log('List renders');

  return (
    <ul>
      {props.list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
};

const Item = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);


export default App
