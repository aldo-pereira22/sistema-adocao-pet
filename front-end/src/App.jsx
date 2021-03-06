import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// Páginas
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/User/Profile';


import Message from './components/Layouts/Message'

// Components
import Footer from './components/Layouts/Footer';
import NavBar from './components/Layouts/NavBar';
import Container from './components/Layouts/Container'
import EditPet from './components/pages/pets/EditPet';



// Context
import {UserProvider} from './context/UserContext'
import MyPets from './components/pages/pets/MyPets';
import AddPet from './components/pages/pets/AddPet';
import PetDetails from './components/pages/pets/PetDetails';

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
                        <Route path="/user/profile" element={<Profile />} > </Route>
                        <Route path="/pet/mypets" element={<MyPets />} > </Route>
                        <Route path="/pet/add" element={ <AddPet /> } > </Route>
                        <Route path="/pet/edit/:id" element={ <EditPet /> } > </Route>
                        <Route path="/pet/:id" element={ <PetDetails /> } > </Route>

                     </Routes>
                </Container>
                <Footer />
            </UserProvider>

        </Router>
    )
        
    }

    export default App;