import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ChatView from './pages/react-chat-view';
import TableView from './pages/react-table-view';
import Sidebar from './components/side-bar';

function App() {
  return (
    <Router>
        <Sidebar/>
        <div className='pl-64'>
        <Routes>
        <Route path='/' element={<ChatView />} />
        <Route path='/table' element={<TableView />} />
      </Routes>
        </div>
    
   
    </Router>
  );
}

export default App;
