import { useState } from 'react'
import '@mantine/core/styles.css';
import Navbar from './components/Navbar';
import EquipmentCard from './components/Card';
import CardGrid from './components/CardGrid';

function App() {
  const [equipments, setEquipments] = useState();

  return (
    <> 
    <Navbar />
    </>
  )
}

export default App