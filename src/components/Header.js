import { Link, useNavigate } from "react-router-dom"
import { AUTH_TOKEN } from "./constants";

const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN)

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate("/")
  }
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link to="/" className="no-underline black">
          <div className="fw7 mr1">Hacker News</div>
        </Link>
        <Link to="/" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link
          to="/create"
          className="ml1 no-underline black"
        >
          submit
        </Link>
      </div>
      <div className="flex flex-fixed">
        {authToken ?
          <div
            className="ml1 pointer black" onClick={handleLogout}>logout
          </div> :
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        }
      </div>
    </div>
  )
}

export default Header;