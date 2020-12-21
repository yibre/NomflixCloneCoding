import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

const Content = styled.div`
  font-size: 20px;
  color: white;
  z-index: 1;
`;

const Logo = styled.div`
  background-image: url(${props => props.bgurl});
  height: 100px;
  background-size: cover;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const Title = styled.span`
  display: block;
  font-size: 15px;
  margin-bottom: 3px;
  margin-top: 3px;
`;

const Items = ({key, logo_path, name}) => (
  <>
  <Logo 
  bgurl = {
    logo_path ? `https://image.tmdb.org/t/p/w300${logo_path}`
    : require("../noPosterSmall.png")
  }
  />
    <Title>{name}</Title>
  </>
);


export default function ProductionList(props) {
  const companies = props.location.state.productionCompanies;
  const countries = props.location.state.productionCountries;
  return (
    <Content>
      <h1>Publisher Companies</h1>
      {companies.map(company => (
        <Items
          key={company.id}
          name= {company.name}
          logo_path = {company.logo_path}
        />
      ))}
      <h1>Production Countries</h1>
      {countries.map(company => (
        <Title>{company.name}</Title>
      ))}
    </Content>
  );
};

// logoUrl = {company.logo_path}

/*
<Logo 
      bgurl = {
        logo_path ? `https://image.tmdb.org/t/p/w300${logoUrl}`
        : require("../noPosterSmall.png")
      }
    />
*/