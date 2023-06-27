import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Movie from "./Movie";
import SearchTextField from "./SearchTextField";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [update, setUpdate] = useState(false);
  const [singleValue, setSingleValue] = useState([]);
// console.log("UPDATRE :",update)



const handleSearch = (searchResults) => {
  // Handle the search results
  console.log('Search results:', searchResults);
  setMovies(searchResults.data)
};

  const fetch = () => {
    try {
      const response = axios
        .get("http://localhost:24000/movie/readAllMovies")
        .then((response) => {
          setMovies(response.data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("INSIDE MOvies :", movies);
    fetch();
  }, []);

  const tableHeaderStyle = {
    border: "1px solid #000",
    padding: "8px",
    backgroundColor: "#f0f0f0",
  };

  const tableCellStyle = {
    border: "1px solid #000",
    padding: "20px",
  };
  const buttonStyle = {
    marginRight: "12px", // Add margin to create spacing
  };

  const updateHandler = (movieData) => {
    console.log("update clicked" + movieData);
    setUpdate(true);
    setSingleValue(movieData);
  };
  const deleteHandler = async (movieId) => {
    try {
      const response = await axios.delete(
        `http://localhost:24000/movie/removeMovie/${movieId}`
      );
      // console.log(response.data);
      if (response.data.statusCode === 200) {
        setMovies(
          movies.filter((mov) => {
            return mov._id !== movieId;
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  let finalJSX = (
    <div>
      <SearchTextField onSearch={handleSearch}/>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Movie Name</th>
            <th style={tableHeaderStyle}>Actor</th>
            <th style={tableHeaderStyle}>Actress</th>
            <th style={tableHeaderStyle}>Director</th>
            <th style={tableHeaderStyle}>Released Year</th>
            <th style={tableHeaderStyle}>Camera</th>
            <th style={tableHeaderStyle}>Producer</th>
            <th style={tableHeaderStyle}>Language</th>
            <th style={tableHeaderStyle}></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((row) => (
            <tr key={row.id}>
              <td style={tableCellStyle}>{row.movieName}</td>
              <td style={tableCellStyle}>{row.actor}</td>
              <td style={tableCellStyle}>{row.actress}</td>
              <td style={tableCellStyle}>{row.director}</td>
              <td style={tableCellStyle}>{row.releasedYear}</td>
              <td style={tableCellStyle}>{row.camera}</td>
              <td style={tableCellStyle}>{row.producer}</td>
              <td style={tableCellStyle}>{row.language}</td>
              <td style={tableCellStyle}>
                <Button
                  style={{ buttonStyle, backgroundColor: "green" }}
                  onClick={() => {
                    updateHandler(row);
                  }}
                >
                  Edit
                </Button>
                <span style={{ margin: "4px" }}></span> {/* Add spacing here */}
                <Button
                  style={{ buttonStyle, backgroundColor: "red" }}
                  onClick={() => {
                    deleteHandler(row._id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  if (update) {
    // console.log(update);
    finalJSX = <Movie data={singleValue} method="put" />;
  }
  return finalJSX;
};

export default Home;
