import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AddGoal from './components/PersonalBoard/AddGoal';
import EditGoal from './components/EditGoal';
import AllRepos from './components/AllRepos';
import SingleRepo from './components/SingleRepo';
import NotFound from './components/NotFound';
import GithubTesting from './components/GithubAPITesting';
import PersonalBoard from './components/PersonalBoard/PersonalBoard';

function RouteList() {
  return (
    <div>
      {/* show routes based on if accessToken exists */}
      {!localStorage.accessToken ? (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate replace to='/404' />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='goals' element={<PersonalBoard/>} />
          <Route path='goals/add' element={<AddGoal />} />
          <Route path='goals/edit/:id' element={<EditGoal />} />

          <Route path='repos' element={<AllRepos />} />
          <Route path='repos/:repoName' element={<SingleRepo />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate replace to='/404' />} />

          <Route path='/testing' element={<GithubTesting />} />
        </Routes>
      )}
    </div>
  );
}

export default RouteList;
