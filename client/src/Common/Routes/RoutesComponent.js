// REACT IMPORTS
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const RoutesComponent = ({ routesList }) => {
  return (
    <Routes>
      {routesList.map((item, index) => {
        const { exact, path, element } = item;
        return <Route exact={exact} path={path} element={element} key={index} />;
      })}
    </Routes>
  );
};

export default RoutesComponent;
