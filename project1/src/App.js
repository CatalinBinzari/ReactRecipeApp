import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "6d40f18c";
  const APP_KEY = "3cc37dc1c1816e27a530ced6277832d0";
  //const REQUEST = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //seteaza counter = 0
  const [counter, setCounter] = useState(0);

  const [recipes, setRecipes] = useState([]); // state for recipes
  const [search, setSearch] = useState(""); //state for search
  const [query, setQuery] = useState("chiken");

  useEffect(() => {
    GetRecipes();
  }, [query]);
  //without second arg, useEffect runs every time state changes
  //adding [] as second arg, useEffect runs only once when page starts
  //adding [counter] , useEffect runs every time counter changes

  const GetRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    ); //awaint and fetch the response
    const data = await response.json(); //format data to json, to use it easily
    console.log(data.hits);
    setRecipes(data.hits);

    /*
    Functional way:
    fetch("https://api.edaman.com")
    .then(response => {
      response.json
    })
     */
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
    //console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault(); //stop page refresh
    console.log(search);
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      {/* create a form */}
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label} // to remove the warning
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
