import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const InsideMenu = styled("div")`
  margin: 20px 0px;
`;

const List = styled("ul")`
  display: flex;
`;

const Item = styled("li")`
  margin-right: 20px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid orange;
  padding: 5px;
  border-radius: 3px;
  background-color: ${(props) => (props.active ? "orange" : "transparent")};
  color: ${(props) => (props.active ? "white" : "orange")};
`;


const MovieTabs = ( { pathname, isMovie, id, videoUrl, productionCom, productionCont, seasons}) => 
    isMovie ? (
        <InsideMenu>
          <List>
            <Item active={pathname === `/movie/${id}/video`}>
              <Link to={{
                pathname : `/movie/${id}/video`,
                state : {
                  keyword : videoUrl
                }
                }}>Video</Link>
            </Item>
            <Item active={pathname === `/movie/${id}/productions`}>
              <Link to={{
                pathname : `/movie/${id}/productions`,
                state : {
                  productionCompanies : productionCom,
                  productionCountries : productionCont
                }
                }}>Productions</Link>
            </Item>    
          </List>
        </InsideMenu>
    ):(
        <InsideMenu>
          <List>
            <Item active={pathname.pathname === `/show/${id}/video`}>
              <Link to={{
                pathname : `/show/${id}/video`,
                state : {
                  keyword : videoUrl
                }
                }}>Video</Link>
            </Item>
            <Item active={pathname.pathname === `/show/${id}/productions`}>
            <Link to={{
                pathname : `/show/${id}/productions`,
                state : {
                  productionCompanies : productionCom,
                  productionCountries : productionCont
                }
                }}>Productions</Link>
            </Item> 
            <Item active={pathname.pathname === `/show/${id}/seasons`}>
              <Link to={{
                pathname : `/show/${id}/seasons`,
                state : {
                  seasonList : seasons
                }
                }}>Seasons</Link>
            </Item> 
          </List>
        </InsideMenu>
    );

export default MovieTabs;