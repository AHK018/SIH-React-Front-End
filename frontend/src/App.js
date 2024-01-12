import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from "./screen/Home";
import ChatBoat from "./screen/ChatBoat";
import Food from "./component/Food";
import Login from "./component/Logn";
import AnnouncementScreen  from "./screen/AnnouncementScreen";
import AboutUs from './screen/AboutUs';
import TestChat from './screen/Elements/TestChatBoat';
import AddAnnouncements from './screen/AddAnnouncements';
import LostAndFound from './screen/LostAndFound';
import Dash from './screen/Dash';
import ProfileMap from './screen/ProfileMap';
import RailwayProfilePage from './screen/Profile';
import FileUploader from './screen/audiotote';
import SignUp from './screen/SignupPage';

export default function App() {

  return (
   <div className='flex flex-col'>
    <Router>
        <Routes>
        <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/chat' element={<ChatBoat/>}></Route>
          <Route exact path='/test' element={<TestChat/>}></Route>
          <Route exact path='/announcement' element={<AnnouncementScreen/>}></Route>
          <Route exact path='/home' element={<Home/>}></Route>
          <Route exact path='/food' element={<Food/>}></Route>
          <Route exact path='/faq' element={<Home/>}></Route>
          <Route exact path='/about' element={<AboutUs/>}></Route>
          <Route exact path='/add' element={<AddAnnouncements/>}></Route>
          <Route exact path="/finder" element={<LostAndFound />} />
          <Route exact path="/dash" element={<Dash />} />
          <Route exact path="/map" element={<ProfileMap />} />
          <Route exact path="/profile" element={<RailwayProfilePage />} />
          <Route exact path="/speech" element={<FileUploader />} />
          <Route exact path="/signup" element={<SignUp />} />
     </Routes>
      </Router>

   </div>
  );
}


