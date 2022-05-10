import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/Home';

function App() {
    return (
        <Router >
            <Routes>
            <Route path="/" element={<Home/>} > </Route>
            <Route path="/login" element={<Login />} > </Route>
            <Route path="/register" element={<Register />} > </Route>

            </Routes>
        </Router>
    )
        
    }

    export default App;