import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccessToken, setAccessToken } from '../features/Auth/AuthSlice';
import { axiosPrivate } from '../lib/axios';
import { refreshToken } from '../features/Auth/AuthServices';
import { useNavigate } from 'react-router-dom';
// redux persit
import { persistor } from '../store';

function useAxiosWithToken() {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const navigate = useNavigate();

  useEffect(() => {
    //* enclose access token in header of request:
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    //* check api response:
    const resIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        //* status code response diffrence 2xx:
        const originRequest = error.config;
        if (error?.response?.status === 401 && !originRequest._resend) {
          //* set flag resend = true
          originRequest._resend = true;
          try {
            const result = await refreshToken();
            const { newAccessToken } = result.data;
            dispatch(setAccessToken(newAccessToken));
            //* re-config
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            //* re send request
            return axiosPrivate(originRequest);
          } catch (err) {
            // clear redux persit
            persistor.purge();
            navigate('/login', { replace: true });
          }
        } else {
          console.log('🚀 ~ file: useAxiosPrivate.js:48 ~ error');
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [accessToken]);

  return axiosPrivate;
}

export default useAxiosWithToken;
