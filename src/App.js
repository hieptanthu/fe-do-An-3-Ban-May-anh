
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout'
import routers from './routers/routers'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Singup from './pages/Singup';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
                  <Route path='/login' element={<Login/>} />
                  <Route path='/Singup' element={<Singup/>} />
                  
          </Route>

          <Route path='/' element={<AppLayout />}>
          
          <Route index element={<Main/>} />
            {routers.map((item) => (
              <Route key={item.parth} path={item.parth} element={item.element} />
            ))}
          </Route>
        </Routes>

      </BrowserRouter>
  );
}

export default App;
