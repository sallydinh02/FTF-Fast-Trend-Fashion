import React, { useState } from "react";
import searchwhite from '../assets/images/searchwhite.png'
// import iconclose from '../assets/images/iconclose.png'
import { useHistory } from "react-router-dom";
// import "./SearchBar.css";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const history = useHistory(); 
  const pushLink=(slug)=>{
    history.push('searchbook/'+slug)
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        
        <div className="searchIcon">
            <img src={searchwhite} alt=""/>
        </div>
        
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={'searchbook/'+value.slug}>
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
      {/* <div className="dataResult">
          {data
            .filter((item) => {
              const searchTerm = wordEntered.toLowerCase();
              const title = item.title.toLowerCase();

              return (
                title.toLowerCase().includes(searchTerm)
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={pushLink(item.slug)}
                className="dataItem"
                key={item.title}
              >
                {item.title}
              </div>
            ))}
        </div> */}
      
    </div>
  );
}

export default SearchBar;