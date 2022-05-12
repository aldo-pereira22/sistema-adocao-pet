import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/Home';


// Components
import Footer from './components/Layouts/Footer';
import NavBar from './components/Layouts/NavBar';
import Container from './components/Layouts/Container'

function App() {
    return (
        <Router >
            <NavBar />
            <Container>
            <Routes>
            <Route path="/" element={<Home/>} > </Route>
            <Route path="/login" element={<Login />} > </Route>
            <Route path="/register" element={<Register />} > </Route>

            </Routes>
            </Container>
            <Footer />
        </Router>
    )
        
    }

    export default App;