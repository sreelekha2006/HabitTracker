import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav>
      <h2>Habit Tracker</h2>

      {user && <p>Welcome, {user.name}</p>}

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;