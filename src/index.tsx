import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Authentication from './components/Authentication';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Posts from './components/Posts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
