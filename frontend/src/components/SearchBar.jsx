import React, { useState } from "react";
import searchblack from '../assets/images/searchblack.png'
// import iconclose from '../assets/images/iconclose.png'
import { useHistory, Link } from "react-router-dom";
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
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
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
    history.push('searchproduct/'+slug)
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
            <img src={searchblack} alt=""/>
        </div>
        
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={'searchproduct/'+value.slug}>
                <p>{value.name} </p>
              </a>
              // <Link to={`/searchproduct/${value.slug}`}>
              //   <a className="dataItem">
              //     <p>{value.name} </p>
              //   </a>
              // </Link>
            );
          })}
        </div>
      )}
      
    </div>
  );
}

export default SearchBar;