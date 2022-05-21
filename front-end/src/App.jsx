import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// Páginas
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/Home';
import Message from './components/Layouts/Message'

// Components
import Footer from './components/Layouts/Footer';
import NavBar from './components/Layouts/NavBar';
import Container from './components/Layouts/Container'


// Context
import {UserProvider} from './context/UserContext'

function App() {
    return (
        <Router >

            <UserProvider>

                <NavBar />
                <Message />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home/>} > </Route>
                        <Route path="/login" element={<Login />} > </Route>
                        <Route path="/register" element={<Register />} > </Route>

                     </Routes>
                </Container>
                <Footer />
            </UserProvider>

        </Router>
    )
        
    }

    export default App;