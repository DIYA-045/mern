function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#4CAF50",
        color: "white",
      }}
    >
      <h2>Kids Learning</h2>
      <div>
        <a href="#" style={{ color: "white", marginRight: "20px" }}>Home</a>
        <a href="#" style={{ color: "white", marginRight: "20px" }}>Courses</a>
        <a href="#" style={{ color: "white", marginRight: "20px" }}>Login</a>
        <a href="#" style={{ color: "white" }}>Register</a>
      </div>
    </nav>
  );
}

export default Navbar;