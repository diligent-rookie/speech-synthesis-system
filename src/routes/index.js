/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './config';

console.log(routes);

export default ()=>(
  <Routes>
    { 
      routes.map(({ path, exact, component:Comp, routes })=>
      <Route 
        key={path}
        exact={exact!==false}
        path={path}
        element={<Comp routes={routes}/>}
      />
      )
    }
  </Routes>
  )