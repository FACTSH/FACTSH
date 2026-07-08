import './App.css';

import Navbar from './components/Navbar/Navbar';
import DoorShell from './components/DoorShell/DoorShell';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Contact from './Pages/Contacts/Contact'
import Why from './Pages/Why/Why'
import Vision from './Pages/Vision/Vision';
import People from './Pages/People/People';
import Publication from './Pages/Publication/Publication'
import FundProject from './Pages/Fundproject/FundProject';
import Gallery from './Pages/Gallery/Gallery';
import Intern from './Pages/Intern/Intern';
import News from './Pages/News/News';

const App = () => {
  return (
    <Router>
      <Navbar />
      <DoorShell>
        <Routes>
          <Route path="/vision" element={<Vision/>} />
          <Route path="/news" element={<News/>} />
          <Route path="/whyfactsh" element={<Why/>} />
          <Route path="/fundproject" element={<FundProject/>} />
          <Route path="/intern" element={<Intern/>} />
          <Route path="/publication" element={<Publication/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/people" element={<People/>} />
        </Routes>
      </DoorShell>
    </Router>
  );
};

export default App;
