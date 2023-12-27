import React, { useContext } from "react";
import { ThemeContext } from "./Contexts";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Brightness3OutlinedIcon from '@mui/icons-material/Brightness3Outlined';
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';
import HearingIcon from '@mui/icons-material/Hearing';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const ChoseColor = () => {

  const actions = [
    { icon: <LightModeOutlinedIcon onClick={() => { color.changeColorValue('white') }} />, name: 'בהיר' },
    { icon: <Brightness3OutlinedIcon onClick={() => { color.changeColorValue('black') }} />, name: 'כהה' },
    { icon: <HearingIcon />, name: 'פקודות קולית' },
    { icon: <ZoomInIcon />, name: 'הגדלת תצוגה' },
  ];

  let color = useContext(ThemeContext);
  return (
    <>
      <div className={color.colorValue === "black" ? "white" : "black"}>
        <Box sx={{ height: 120, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<AccessibleIcon />}
  

          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>
      </div>
    </>
  )
}
export default ChoseColor;