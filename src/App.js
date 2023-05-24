import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { privateRouters, publicRouters } from './routes/routes';
import { DefaultLayout } from './layouts';
import NotFound from './pages/NotFound.jsx';
import { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserId } from './features/Auth/AuthSlice';

function App() {
  const userId = useSelector(getUserId);
  const [isLogin, setIsLogin] = useState(userId != null);

  // check user login
  useEffect(() => {
    setIsLogin(userId != null);
  }, [userId]);

  return (
    <Router>
      <div className="">
        <Routes>
          {
            // map public route
            publicRouters.map((route, index) => {
              const Page = route.component;

              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })
          }
          {
            // map private route
            privateRouters.map((route, index) => {
              const Page = route.component;

              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isLogin ? (
                      <Layout>
                        <Page />
                      </Layout>
                    ) : (
                      <Navigate to={'/login'} />
                    )
                  }
                >
                  {Array.isArray(route.children) &&
                    route.children.map((childRoute, index) => {
                      const SubPage = childRoute.component;
                      return <Route key={index} path={childRoute.path} element={<SubPage />} />;
                    })}
                </Route>
              );
            })
          }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
