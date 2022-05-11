import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/Home';


// Components
import Footer from './components/Layouts/Footer';
import NavBar from './components/Layouts/NavBar';

function App() {
    return (
        <Router >
            <NavBar />
            <Routes>
            <Route path="/" element={<Home/>} > </Route>
            <Route path="/login" element={<Login />} > </Route>
            <Route path="/register" element={<Register />} > </Route>

            </Routes>
            <Footer />
        </Router>
    )
        
    }

    export default App;