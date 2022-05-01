import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


function Popup({ selected, closePopup })
{
	const [state, setState] = useState({
		s: "",
		results: [],
		selected: {}
	  });
	
	  const apiUrl = "http://www.omdbapi.com/?apikey=72ff8aa9";
	let openPopup = id =>
  {
    axios(apiUrl + "&i=" + id).then(({ data }) =>
    {
      let result = data;
      //console.log(result);
      setState(prevState =>
      {
        return { ...prevState, selected: result }
      });
    });
  }

	return (
		<section className="popup">
			<div className="content">
				<div className="plot">
					<img src={selected.Poster} alt="" />
					
				</div>
				<div className='plot2'>
					<h2 openPopup={openPopup}>{selected.Title} <span>({selected.Year})</span></h2>
					<p className="rating">Rating:⭐️ {selected.imdbRating}</p>
					<p id="rating"><span>Genre: {selected.Genre}</span>	</p>
					<p>{selected.Plot}</p>
				</div>
				<button className="close" onClick={closePopup}>X</button>
			</div>
		</section>
	)
}

export default Popup
