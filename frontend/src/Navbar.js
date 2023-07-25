import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* <h1>Bachelor Defense Schedule</h1> */}
      <Link to="/" >Bachelor Defense Schedule</Link>
      <div className="links">
        
        
        <Link to="/about">How To use</Link>
        {/* <Link to="/create" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>New Blog</Link> */}
      </div>
    </nav>
  );
}
 
export default Navbar;