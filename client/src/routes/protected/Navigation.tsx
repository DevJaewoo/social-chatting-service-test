import { Link, useLocation } from "react-router-dom";
import logo from "src/logo.svg";

interface Props {
  link: string;
  name: string;
  highlight?: boolean;
}

const NavigationItem: React.FC<Props> = ({ link, name, highlight }) => {
  return (
    <Link
      className={`flex justify-center items-center w-24 h-10 text-lg ${
        highlight ? "font-bold border-b-2" : ""
      }`}
      to={link}
    >
      {name}
    </Link>
  );
};

const Navigation: React.FC<{}> = () => {
  const location = useLocation();

  return (
    <header className="top-0 w-full h-16 min-w-[640px] bg-white shadow-md fixed z-50">
      <nav className="max-w-screen-xl h-full mx-auto">
        <div className="flex flex-row justify-between items-center w-full h-full px-4">
          <div className="flex flex-row items-center h-full">
            <div className="flex flex-col justify-center h-full">
              <Link to="/">
                <img src={logo} alt="logo" className="w-16 h-auto" />
              </Link>
            </div>
          </div>
          <div className="flex flex-row items-center h-full">
            <div className="flex flex-row justify-center items-center h-full">
              <NavigationItem
                link="/"
                name="Rooms"
                highlight={location.pathname === "/"}
              />
              <NavigationItem
                link="/users"
                name="Users"
                highlight={location.pathname.startsWith("/users")}
              />
              <NavigationItem
                link="/friends"
                name="Friends"
                highlight={location.pathname.startsWith("/friends")}
              />
              <NavigationItem link="/logout" name="Logout" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
