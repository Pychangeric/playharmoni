import React, { useState } from 'react';
import "./Search.css"

const Search = () => {
  const [title, setTitle] = useState('');
  const [foundMusic, setFoundMusic] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!title) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/musics`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const musicList = await response.json();
      if (musicList.length > 0) {
        setFoundMusic(musicList[0]);
      } else {
        setFoundMusic(null);
      }
    } catch (error) {
      console.error('Error fetching music data:', error);
      setFoundMusic(null);
    }
  };


function Search() {
  const[query,setQuery] = useState('')
  return (
    <div>
   <form>
    <input type='text' />
   </form>
    </div>
  )
}
};
export default Search