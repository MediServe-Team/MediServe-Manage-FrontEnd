import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRouters, publicRouters } from './routes/routes';
import {DefaultLayout} from './layouts'
import NotFound from './pages/NotFound.jsx';
import { Fragment } from 'react';

function App() {
  const isLogin = true;
  return (
  <Router>
      <div className="">
        <Routes>
          {
            // map public route
            publicRouters.map((route, index) => {
              const Page = route.component;

              let Layout = DefaultLayout;

              if(route.layout){
                Layout = route.layout
              }else if (route.layout === null){
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page/>
                    </Layout>}
                  />
              )
            })
          }
          {
            // map private route
            isLogin && privateRouters.map((route, index) => {
              const Page = route.component;

              let Layout = DefaultLayout;

              if(route.layout){
                Layout = route.layout;
              }else if(route.layout === null){
                Layout = Fragment
              }

              return(
                <Route 
                key={index}
                path={route.path} 
                element={
                  <Layout>
                    <Page/>
                  </Layout>
                }/>
              )
            })
          }
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
