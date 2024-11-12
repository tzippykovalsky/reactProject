import { Link, useNavigate, NavLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import { CoinContext, ThemeContext } from "./Contexts";
import { Box, Tabs, Tab, TextField, MenuItem, Alert, Stack, styled } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const NavBar = () => {

  const navigate = useNavigate();
  function toDonate() {
    setValue(1);
    navigate("ToDonate");
  }
  function donations() {
    setValue(0);
    navigate("/");
  }

  const [showMessage, setShowMessage] = useState(false);
  let typeCoin = useContext(CoinContext);

  const changeCoin = (e) => {
    typeCoin.changeCurrencyType(e.target.value);
    // setChecked(e.target.value);
    messageByCangeCoin();
  }
  //אחראי על הפוקוס תרומות/תרומה
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };


  function messageByCangeCoin() {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);

  };
  let color = useContext(ThemeContext);




  // const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  //   width: 62,
  //   height: 34,
  //   padding: 7,
  //   '& .MuiSwitch-switchBase': {
  //     margin: 1,
  //     padding: 0,
  //     transform: 'translateX(6px)',
  //     '&.Mui-checked': {
  //       color: '#fff',
  //       transform: 'translateX(22px)',
  //       '& .MuiSwitch-thumb:before': {
  //         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
  //           '#fff',
  //         )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
  //       },
  //       '& + .MuiSwitch-track': {
  //         opacity: 1,
  //         backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
  //       },
  //     },
  //   },
  //   '& .MuiSwitch-thumb': {
  //     backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
  //     width: 32,
  //     height: 32,
  //     '&::before': {
  //       content: "''",
  //       position: 'absolute',
  //       width: '100%',
  //       height: '100%',
  //       left: 0,
  //       top: 0,
  //       backgroundRepeat: 'no-repeat',
  //       backgroundPosition: 'center',
  //       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
  //         '#fff',
  //       )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
  //     },
  //   },
  //   '& .MuiSwitch-track': {
  //     opacity: 1,
  //     backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
  //     borderRadius: 20 / 2,
  //   },
  // }));
  // const [checked, setChecked] = React.useState(true);


  return (
    <>
      <div className={color.colorValue === "black" ? "white" : "black"} >
        <div >
          <div>
            {/* <FormGroup>
              <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked value={typeCoin.coin.currencyType}/>}
                label="בחר סוג מטבע"
                onChange={changeCoin}
                checked={typeCoin.coin.currencyType}

              />
            </FormGroup> */}




            <Box
              sx={{ '& .MuiTextField-root': { m: 1, width: '15ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField id="outlined-select-currency" select label="בחר סוג מטבע" defaultValue="shekel" onChange={changeCoin}>
                <MenuItem value="dollar">$</MenuItem>
                <MenuItem value="shekel" >₪</MenuItem>
              </TextField>
            </Box>
            {showMessage == true &&
              <Stack sx={{ width: '20ch', marginLeft: 2 }} spacing={4}>
                <Alert sx={{ color: "black" }} variant="outlined" severity="success">
                  {`שינוי המטבע ל- ${typeCoin.coin.currencyType == "shekel" ? "₪" : "$"}בוצע בהצלחה  `}
                </Alert>
              </Stack>
            }
          </div>
          {/* ...(color.colorValue === "black" ? { color: "black", fontSize: 20 } : {color:"white",fontSize: 20}) */}
          <Box sx={{ marginBottom: 2 }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab sx={{ ...(color.colorValue === "black" ? { color: "white", fontSize: 20 } : { color: "black", fontSize: 20 }) }} label="תרומות" onClick={donations} />
              <Tab sx={{ ...(color.colorValue === "black" ? { color: "white", fontSize: 20 } : { color: "black", fontSize: 20 }) }} label="לתרומה" onClick={toDonate} />
            </Tabs>
          </Box>
        </div>
        <div style={{ width: "100%", height: "30px", backgroundColor: "#bb9a3d" }} />
      </div>


    </>
  );
};


export default NavBar;