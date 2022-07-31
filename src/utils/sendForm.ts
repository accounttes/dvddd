import fetchData from './fetchData';

const sendForm = async (
  login: string,
  password: string,
  setValidationErr: any,
  dispatch: any,
  setIsAuth: any,
  navigate: any,
) => {
  try {
    const resp = await fetchData('/login', { email: login, password });
    if (resp) {
      document.cookie = `access_token=${resp.data.accessToken}; ; secure=true; SameSite=strict; max-age=3600`;
      setValidationErr('');
      dispatch(setIsAuth(true));
      navigate('/posts');
    }
  } catch (e: any) {
    console.log(e);
    setValidationErr(e.response.data);
  }
};

export default sendForm;
