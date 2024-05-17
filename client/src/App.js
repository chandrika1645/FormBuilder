import { useState } from 'react';
import './App.css';
import Grid from './Components/Grid';
import JobDetails from './Components/JobDetails';
import ServiceAdd from './Components/ServiceAdd';
import ApplianceTable from './Components/ApplianceTable.js';
import Testtable from './Components/Testtable';
import './Styles/Grid.css'
import PageBreak from './Components/PageBreak.js';
// import PageBreakTry from './Components/PageBreakTry.js';
// import DynamicTable from './Components/DynamicTable';




function App() {

  const [rightContentFlexBasis, setRightContentFlexBasis] = useState('25%'); 


  const handleOrientationChange = (flexBasis) => {

    console.log("called the function");
    setRightContentFlexBasis(flexBasis); 
    
  };


  return (
    <div className="App">
          
      <div className='Left-content'>

        <div className='button'>

          <button className="portrait-button" onClick={() => {
            handleOrientationChange('25%');
            
          }}> 
            
            Portrait
          </button>

          <button className="landscape-button" onClick={() => {
            handleOrientationChange('85%');
            
          }}> 
            
            Landscape
          </button>

        </div>
        <JobDetails/>
       
        <ApplianceTable/>
        <PageBreak/>
        <ServiceAdd/>
        
        <Testtable/>
        <ServiceAdd/>
      </div> 


     
      <div className='Right-content' style={{ flexBasis: rightContentFlexBasis }}>



        <Grid rightContentFlexBasis={rightContentFlexBasis} />
      </div>
      
    </div>
  );
}

export default App;