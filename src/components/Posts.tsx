import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../constants/fakeData';
import HeaderLayout from '../layouts/HeaderLayout';
import { useAppSelector } from '../redux/hooks';
import { setIsAuth } from '../redux/slices/user';
import fetchData from '../utils/fetchData';
import getCookie from '../utils/getCookie';
import getPosts from '../utils/getPosts';
import getUser from '../utils/getUser';
import Post from './Post';
import { setData } from '../redux/slices/data';
import './styles/Posts.scss';
import randomInteger from '../utils/randomInteger';

function Posts() {
  const dispatch = useDispatch();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  const result = useAppSelector((state) => state.data.result);

  const [posts, setPosts] = useState<any[]>([]);
  const [resultPosts, setResultPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  const limit = randomInteger(5, 15);

  useEffect(() => {
    console.log('fetching', fetching);
  }, [fetching]);

  useEffect(() => {
    if (fetching) {
      const userId = randomInteger(5, 15);
      let URL1 = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${currentPage}`;
      let URL2 = `https://jsonplaceholder.typicode.com/users`;
      let URL3 = `https://jsonplaceholder.typicode.com/photos`;

      const promise1 = axios.get(URL1);
      const promise2 = axios.get(URL2);
      const promise3 = axios.get(URL3);

      Promise.all([promise1, promise2, promise3]).then((values) => {
        const newValues = values.map((curr) => curr.data);
        newValues[0] = [...result, ...newValues[0]];

        setCurrentPage((prev) => prev + 1);
        setTotalCount(Number(values[0].headers['x-total-count']));
        setFetching(false);
        dispatch(setData(newValues));
      });
    }
  }, [fetching]);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      console.log('ПОШЕЛФЕТЧИНГ');
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    const access_token = getCookie('access_token');

    getPosts(access_token)
      .then((res) => {
        if (res.data[0].isAuth) {
          dispatch(setIsAuth(true));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    console.log('result', result);
  }, [result]);

  return (
    <>
      <HeaderLayout>
        {isAuth ? (
          <div className="posts">
            <div className="posts-wrapper">
              {result.length > 0 && result.map((post) => <Post key={post.id} {...post} />)}
            </div>
          </div>
        ) : (
          <h2 className="alert">
            Эту страницу могут просматривать только авторизованные пользователи
          </h2>
        )}
      </HeaderLayout>
    </>
  );
}

export default Posts;
