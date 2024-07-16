import { Routes, Route } from 'react-router-dom';

import { UnauthenticatedRoute } from './components/route-guards/unauthenticated-route';
import { LoginPage } from './pages/login';
import { AuthenticatedRoute } from './components/route-guards/authenticated-route';
import { AppLayout } from './pages/(app)/_layout';
import { AppIndexPage } from './pages/(app)';
import { NewPage } from './pages/(app)/new';
import { BoardPage } from './pages/(app)/board';

function App() {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<AuthenticatedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<AppIndexPage />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/board/:board" element={<BoardPage />} />
          <Route path="/board/:board/*" element={<BoardPage />} />
          {/* <Route path='/dashboard' element={<Chatbot />} /> */}
          {/* <Route path="/dashboard" element={<FlowDiagram />} /> */}
          {/* <Route path='/dashboard/chatbot' element={<ChatView />} /> */}
          {/* <Route path='/dashboard/table' element={<TableView />} /> */}
        </Route>
      </Route>

      {/* Public Routes */}
      <Route element={<UnauthenticatedRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
