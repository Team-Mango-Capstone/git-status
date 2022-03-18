import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import Home from './components/Home';
import Goals from './components/Goals';
import GoalsAdd from './components/GoalsAdd';
import GoalsEdit from './components/GoalsEdit';
import AllRepos from './components/AllRepos';
import SingleRepo from './components/SingleRepo';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='home' element={<Home />} />
      

        <Route path='goals' element={<Goals />} />
        <Route path='goals/add' element={<GoalsAdd />} />
        <Route path='goals/edit/:id' element={<GoalsEdit />} />

        <Route path='repos' element={<AllRepos />} />
        <Route path='repos/:id' element={<SingleRepo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
