import { useState } from 'react';
import Stepper from './components/Stepper';
import { StepperContext } from './contexts/StepperContext';
import StepperControl from './components/StepperControl';
import Account from './components/steps/Account';
import Details from './components/steps/Details';
import Final from './components/steps/Final';

function App() {
  const [currentStep,setCurrentStep] =useState(1)
  const [userData,setUserData]=useState('')
  const [finalData,setFinalData]=useState([])
  const steps=["Account information","Personal Details","Complete"]

  const handleClick=(direction)=>{
    let newStep = currentStep;
    direction ==='next'?newStep++:newStep--;
    //check if steps are within bounds
    newStep>0&&newStep<= steps.length&&setCurrentStep(newStep)
  }

  const displayStep=(step)=>{
    switch(step){
      case 1: 
        return <Account/>
      case 2:
        return <Details/>
      case 3:
        return <Final/>
      default:
    }
  }
  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl  pb-2 bbg-white">
      {/** Stepper */}
      <div className='container horizontal mt-5'>
      
      <Stepper steps={steps} currentStep={currentStep}/>
            {/** Display Components */}
      <div className='m-10 p-10'>
        <StepperContext.Provider value={{userData,finalData,setFinalData,setUserData}}>
          {displayStep(currentStep)}
        </StepperContext.Provider>
      </div>
      </div>
      
      {/** Navigation  controls*/}
      <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps}/>
    </div>
  );
}

export default App;
