import Background from '../../assets/images/dooms.jpg';
import { Link } from 'react-router-dom';
import '../Home/Home.css';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
    const { user, isAuthenticated } = useAuth0();

    if(!isAuthenticated || !user) {
        return (
            <div 
            style={{ backgroundImage: `url(${ Background})`}} 
            className='dooms'
            >
                <div className='home-page'>
                    <div className='meet'>
                        <h2>Meet the saviours of the world!</h2>
                    </div>
                    <div className='explore'>
                        <p>Explore the capabilities our hero's on earth...</p>
                    </div>
                    <div>
                        <button className='nav-dash' type='button'><Link to='/About/About'>Explore</Link></button>
                    </div>
                </div>
            </div>
        );
    }
    
        return (
            <div className='welcome'>
                <h3 className='greeting'>
                    Hello { user.name ? user.name : user.email }, Welcome to the Avengers!
                </h3>
            </div>
    );
};

export default Home;
