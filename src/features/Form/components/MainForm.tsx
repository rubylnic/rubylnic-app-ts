import React, { FC, useState } from 'react'
import FormStep1 from './FormSteps/FormStep1'
import FormStep2 from './FormSteps/FormStep2';
import FormStep3 from './FormSteps/FormStep3';
import Box from '@mui/material/Box';

// import styles from './CarItem.module.scss'

const MainForm: FC = () => {
    const [activeFormStep, setActiveFormStep] = useState(1);

    return (
        <Box className='MainForm'>
            {activeFormStep === 1 ? <FormStep1 setActiveFormStep={setActiveFormStep} /> : null}
            {activeFormStep === 2 ? <FormStep2 setActiveFormStep={setActiveFormStep} /> : null}
            {activeFormStep === 3 ? <FormStep3 setActiveFormStep={setActiveFormStep} /> : null}
            {activeFormStep === -1 ? <div>success modal</div> : null}
        </Box>
    )
}

export default MainForm