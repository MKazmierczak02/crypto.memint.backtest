import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";
import {useNavigate} from "react-router-dom";

const NavigationBar = () => {

  const [healthy, setHealthy] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHealthy = async () =>{
      const response = await axios.get("/api/check")
      if (response.data.status === "ok") {
        setHealthy(true);
      }
    }
    fetchHealthy()
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar expand="lg" variant="dark" className={"saira-condensed-bold fixed-top"}>
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} className={"navbar-logo"}>MEMINT</Navbar.Brand>
        <span className="navbar-badge" style={healthy ? {background: "green"} : {background: "red"}}></span>
        <Navbar.Toggle aria-controls="" className="nav-toggle"/>
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center navbar-nav">
            {userInfo ? (
                <>
                  <Nav.Link onClick={() => navigate('/simulations')} className="me-3">Simulations</Nav.Link>
                  <Nav.Link onClick={() => navigate('/strategies')} className="me-3">Strategies</Nav.Link>
                  <Nav.Link href="#" className="me-3">Statistics</Nav.Link>
                  <Nav.Link onClick={logoutHandler} className="">Log out</Nav.Link>
                </>
            ) : (
                <>
                  <Nav.Link href="#" className="me-3">Pricing</Nav.Link>
                  <Nav.Link href="#" className="me-3">Tools</Nav.Link>
                  <Nav.Link href="#" className="me-3">About</Nav.Link>
                  <Nav.Link onClick={() => navigate('/login')} className="">Log in</Nav.Link>
                </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
