import React,{useState,useEffect} from 'react';
import './App.css';

function App() {

  const [query,setQuery] = useState('')

  const [container,setContainer] = useState([])

  const [endPoint,setEndPoint] = useState('')

  useEffect(() => {

  fetch(`https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=+${query}`, {
    "method": "GET",
    "headers": {
      "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
      "X-RapidAPI-Key": "9f90788b59mshc9043b241bbdf5dp1acd6fjsn3a2419effccd"
  }
})
.then(response => {
  return response.json(); 
})
.then(data => {
 setContainer(data.hints)
})
.catch(err => {
  console.error(err);
});

},[endPoint])

const onChangeHandler = (e) => {
  setQuery(e.target.value)
}

const onSubmitHandler = e => {
  e.preventDefault()
  setEndPoint(query)
}

  return (
    <div className="App">
      <header className='header'>
      <div className='appName'>Foodies</div>
      <form onSubmit={onSubmitHandler}>
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <input type="text" value={query}onChange={onChangeHandler}/> 
        <button type="submit">Submit</button>
        </div>
      </form>
      </header>
    <div className="element">
    {container.map((item) => {
      return (
        <div>
          <img src={item.food.image} alt="" />
          <p>{item.food.label}</p>
        </div>
      )
    })}
  </div>
  </div>
  );
}

export default App;
