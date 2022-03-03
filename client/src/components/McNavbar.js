import { Navbar, Container } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { Person, PersonFill, HouseFill, Heart, House, HeartFill } from 'react-bootstrap-icons';
import { baseGreen } from "../style/colors.js"
import "../style/McNavbar.css";

function McNavbar(props) {
    const location = useLocation();
    const history = useHistory();

    function handleProfile() {
        history.push('/profile');
    }

    function handleHome() {
        history.push('/');
    }

    function handleFav() {
        history.push('/favorites');
    }

    return (
        <Navbar style={{backgroundColor: baseGreen, height:'55px'}} fixed="bottom">
            <Container>

                {location.pathname === "/profile" ?
                    <PersonFill className="icon-style left-icon" onClick={handleProfile} /> :
                    <Person className="icon-style left-icon" onClick={handleProfile}/>}

                {(location.pathname === "/" || location.pathname === "/search") ?
                    <HouseFill className="icon-style" onClick={handleHome}/> :
                    <House className="icon-style" onClick={handleHome}/>}

                {location.pathname === "/favorites" ?
                    <HeartFill className="icon-style right-icon" onClick={handleFav}/> :
                    <Heart className="icon-style right-icon" onClick={handleFav}/>}

            </Container>
        </Navbar>
    );
}

export default McNavbar;