import { Route, Routes } from "react-router-dom"
import './App.css';

/** Components */
import SubCriteria from './pages/SubCriteria';
import Scan from './pages/Scan';
import VariableInfo from './pages/VariableInfo';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Scan />} />
      <Route path="/subcriteria" element={<SubCriteria />} />
      <Route path="/variableinfo" element={<VariableInfo />} />
    </Routes>
  );
}

export default App;
