import { NavLink } from "react-router-dom";

function ModalMenu({ hideMenu, onLine }) {
  return (
    <div onClick={hideMenu} className={(onLine?"top-10":"top-20")+' fixed h-full w-screen z-10 bg-gray-900/70 text-white sm:w-[540px]'}>
      <ul className=" list-none">
        <li>
          <NavLink to='/' onClick={hideMenu} className="link-menu">Home</NavLink>
        </li>
        <hr className="border-gray-300 rounded-md mx-1" />
        <li>
          <NavLink to='/platos' onClick={hideMenu} className="link-menu">Platos</NavLink>
        </li>
        <li>
          <NavLink to='/bebidas' onClick={hideMenu} className="link-menu">Bebidas</NavLink>
        </li>
        <li>
          <NavLink to='/postres' onClick={hideMenu} className="link-menu">Postres</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default ModalMenu;