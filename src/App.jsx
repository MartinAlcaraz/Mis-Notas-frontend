import ErrorBoundary from './components/ErrorBoundary';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Dashboard from './Pages/Dashboard';
import ModalExpiredLoggin from './components/ModalExpiredLoggin';
import { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from './context/UserContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import ErrorPage from './Pages/ErrorPage';

import NavbarSticky from './components/NavbarSticky';
import Register from './Pages/Register'
import MyAccount from './Pages/MyAccount';
import SharedNotes from './Pages/SharedNotes'
import About from './Pages/About';

function App() {

  const { user, showModalExpiredLoggin, setShowModalExpiredLoggin, setUnloggedUser } = useContext(UserContext);
  const [onLine, setOnLine] = useState(true);
  const [classShowMessageOffLine, setClassShowMessageOffLine] = useState('hidden');
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [allPaths, setAllPaths] = useState([]);

  // OFFLINE Checker
  useEffect(() => {
    setOnLine(navigator.onLine);

    if (!navigator.onLine) {  // si está offline se muestra el mensaje
      setClassShowMessageOffLine('block');
    }

    if (navigator.onLine) { // si esta onLine se oculta el mensaje, si no, no se oculta.
      setTimeout(() => {
        setClassShowMessageOffLine('hidden');
      }, 3000);
    }
  }, [navigator.onLine]);

  const allRoutes = (
    <Routes>
      <Route path='/' element={user.isLogged ? <Navigate to="/dashboard" replace/> : <Main user={user} />  }/>

      <Route path='/about' element={<About />} />

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Register />} />

      <Route path="/error" element={<ErrorPage />} />

      <Route path='/*' element={<NotFound />} />

      <Route element={<ProtectedRoutes user={user} />}>
        {/* <Route path='/addProduct' element={<AddProduct />} /> */}
        <Route path='/dashboard' element={<Dashboard user={user}/>} />

        <Route path='/sharednotes' element={<SharedNotes user={user}/>} />
        {/* <Route path='/removeUser' element={<RemoveUser user={user} />} /> */}
        <Route path='/myaccount' element={<MyAccount user={user} />} />
      </Route>

    </Routes>);

  // se crea un array con las rutas creadas en Routes 
  useEffect(() => {
    let array = [];
    allRoutes.props.children.forEach(e => {
      if (e.props.path != "/*") {
        array.push(e.props.path);
      }
    });
    setAllPaths(array);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className='h-full w-full bg-white scrollbar-hide'>
          <div id="portal"></div>

          {/* {showModalMenu ? <ModalMenu hideMenu={hideMenu} onLine={onLine} /> : <></>} */}

          {/* si expira la sesion se cierra la misma y se muestra el mensaje de cierre de sesion. */}
          {showModalExpiredLoggin ? <ModalExpiredLoggin setShowModalExpiredLoggin={setShowModalExpiredLoggin} /> : <></>}

          {/* <div className={classShowMessageOffLine + " fixed top-0 left-0 w-full z-20"}>
            {
              onLine ?
                <div className='bg-green-400 text-gray-50 text-center p-2'> Online!!!</div>
                :
                <div className='bg-red-500 text-gray-50 font-medium p-2'>You are offline...</div>
            }
          </div> */}

          {/* online = true  cambiar a { online } para que muestre la notificacion de offline*/}
          {/* <NavBar toggleMenu={toggleMenu} hideMenu={hideMenu} allPaths={allPaths} user={user} onLine={true} /> */}
          <NavbarSticky user={user} setUnloggedUser= {setUnloggedUser}/>
          
          <div className='pt-8 min-h-screen bg-primary'>
            {allRoutes}  {/* rutas */}
          </div>
          
          <Footer />

        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App;
