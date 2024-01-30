import React, { useState, useEffect, useRef } from "react";
import { Navbar, MobileNav, Typography, Button, IconButton, Card } from "@material-tailwind/react";
import { Link, useNavigate, redirect } from "react-router-dom";
import ModalLoading from "./ModalLoading";

export default function NavbarSticky({ user, setUnloggedUser }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [loading, setLoading] = useState(false);

  // to hide/show navbar in scroll
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true)

  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 720 && setOpenNav(false),
    );
  }, []);

  
  // to show or hide navbar in scroll
  const handleScroll = () => {
    // only hide the navbar when the windows heigth is less than 560px
    if (window.innerHeight < 560) {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setPrevScrollPos(currentScrollPos);
    }else{
      setVisible(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll)
  })

  const logout = async () => {
    setLoading(true);
    const res = await setUnloggedUser();
    if (res) {
      setLoading(false);
    }
  }

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  // onMouseDown tiene prioridad sobre onBlur() y onBlur() tiene prioridad sobre el evento onClick().
  // uso onMouseDown para poder ejecutar el link y luego cerrar el menu.
  return (
    <Navbar onBlur={() => setOpenNav(false)}
      className={`fixed ${visible ? 'top-0' : 'top-[-100px]'} transition-top duration-300 z-40 h-max max-w-full rounded-none px-4 py-2 md:px-8 md:py-4`}
    >

      {loading ? <ModalLoading /> : <></>}

      {/* navbar show in viewport >= 720px */}
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
          <Link to={user.isLogged ? '/dashboard' : '/'}>Mis Notas</Link>
        </Typography>

        <div className="flex items-center gap-4">
          {
            user.isLogged ?
              <div className="w-8 h-8">
                <div className="md:hidden text-center bg-blue-700 rounded-full w-full h-full">
                  <Link to='/myaccount'>
                    <span className="block w-full h-full p-[0.12rem] text-center capitalize text-[0px] first-letter:text-lg font-semibold">{user.username}</span>
                  </Link>
                </div>
              </div> :
              <></>
          }
          <div className="mr-4 hidden md:block">
            {navList}
          </div>
          {
            user.isLogged ?
              // show logged user button
              <div className="hidden md:block w-10 h-10">

                <button onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-center relative bg-blue-700 rounded-full w-full h-full">
                  <div className="p-1 text-center capitalize text-[0px] first-letter:text-lg font-semibold">{user.username}</div>
                </button>
                {
                  user.isLogged && showUserMenu ?
                    // dropdown menu
                    <Card className="p-2 bg-gray-100 absolute right-4 mt-2">
                      < ul onClick={() => setShowUserMenu(false)}>
                        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
                          <Link to="/myaccount" className="flex items-center hover:text-black active:text-blue-700">
                            Mi cuenta
                          </Link>
                        </Typography>
                        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
                          <Link to="/" onClick={() => logout()} className="flex items-center hover:text-black active:text-blue-700">
                            Salir
                          </Link>
                        </Typography>
                      </ul>
                    </Card>
                    : <></>
                }
              </div> :
              // show buttons to login or signup
              <div className="flex items-center gap-x-1">
                {/* buttons signin and login */}
                <Button
                  variant="text"
                  size="sm"
                  className="hidden md:inline-block"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden md:inline-block"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </div>
          }

          {/* button menu navbar ||| */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>

      {/* if mobile this component will show */}

      <MobileNav open={openNav}>
        <div >
          {navList}

          <div className="">
            {
              user.isLogged ?
                // show logged user
                < ul className="border-t-2 border-t-gray-500">
                  <Typography as="li" variant="small" color="blue-gray" className="p-1 pt-2 font-normal">
                    <Link to="/myaccount" className="flex items-center hover:text-black active:text-blue-700"
                      onMouseDown={() => navigate("/myaccount")} >
                      Mi cuenta
                    </Link>
                  </Typography>
                  <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
                    <Link to="/" className="flex items-center hover:text-black active:text-blue-700"
                      onMouseDown={() => { console.log('salir'); logout(); navigate("/") }}
                    >
                      Salir
                    </Link>
                  </Typography>
                </ul>
                :
                <div className="flex items-center gap-x-1">
                  <Button fullWidth variant="text" size="sm" onMouseDown={() => navigate('/login')}>
                    Log In
                  </Button>
                  <Button fullWidth variant="gradient" size="sm" onMouseDown={() => navigate('/signup')}>
                    Sign up
                  </Button>
                </div>
            }
          </div>
        </div>
      </MobileNav>
    </Navbar >
  );
}