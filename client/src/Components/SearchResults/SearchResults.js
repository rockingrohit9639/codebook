import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import server from "../../axios/instance";
import { Container } from "../Basic/Basic";
import Post from "../Posts/Post";

const Heading = styled.h1`
  margin: 1rem 0;
`;

const SearchPosts = styled.div``;

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const query = new URLSearchParams(window.location.search).get("q");
  const navigate = useNavigate();

  const fetchSearchResults = useCallback(async () => {
    try {
      const res = await server.get(`/posts/search?q=${query}`);

      if (res.status === 200) {
        setSearchResults(res.data);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  }, [query]);

  useEffect(() => {
    if (!query) {
      return navigate("/");
    }

    fetchSearchResults();
  }, [navigate, query, fetchSearchResults]);
  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Heading>Search Results ({searchResults.length})</Heading>

      <SearchPosts>
        {searchResults.length > 0
          ? React.Children.toArray(
              searchResults.map((post) => <Post post={post} />)
            )
          : null}
      </SearchPosts>
    </Container>
  );
}

export default SearchResults;
