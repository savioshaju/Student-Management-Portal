import { Routes, Route } from 'react-router-dom';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import MainLayout from './Layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Students />} />
        <Route path="user/:roll_number" element={<StudentDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
