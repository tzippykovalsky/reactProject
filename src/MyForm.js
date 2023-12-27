import React, { useState, useRef, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./MyForm.css";
import { Button, Stack, Box, TextField, Divider, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { fromXtoShekel } from "./dollarUtils";
import { CoinContext, ThemeContext } from "./Contexts";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useNavigate } from "react-router-dom";
import myVideo from './images/video.mp4';
import img from "./images/imgSen.PNG";



let schema = yup.object().shape({
  name: yup.string("רק מחרוזת").required("שדה חובה").min(3, "המחרוזת חייבת להיות לפחות 3 תווים"),
  sum: yup.number("רק ספרות").typeError("יכול להכיל רק ספרות").min(1).required("שדה חובה"),
  // credit: yup.string().matches(/[0-9]{10,15}/"לא תואם לתבנית")

});

const MyForm = ({ setDonationsArr }) => {

  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focused, setFocused] = useState('');
  const navigate = useNavigate();

  function handleChanges(e) {
    handleInputChange(e);
    handleChange();
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'number':
        setNumber(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'expiry':
        setExpiry(value);
        break;
      case 'cvc':
        setCvc(value);
        break;
      default:
        break;
    }

  };

  const handleFocusChange = ({ focus }) => {
    setFocused(focus);
  };
  //עד כאן אשראי

  const steps = [
    'פרטי תרומה',
    'פרטי אשראי',
    'סיום',
  ];

  let coinType = useContext(CoinContext);


  let { register, handleSubmit, reset, formState: { dirtyFields, errors, isValid } } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const saveDetails = (data) => {
    const currentDate = new Date();
    const sum = fromXtoShekel(data.sum, coinType.coin.currencyType, coinType.coin.dollarAmount) * 2

    const newData = {
      name: data.name,
      dedication: data.dedication,
      sum: sum,
      donationTime: currentDate
    };

    setDonationsArr((prevArr) => [...prevArr, newData]);
    navigate("/");


  }
  let color = useContext(ThemeContext);

  const [activeStep, setActiveStep] = useState(0);

  const handleChange = () => {
    if ("sum" != "" && "name" != "" & !errors.sum && !errors.name) {
      setActiveStep(1);
      // if ("number" != ""&&"sum" != "" && "name" != "" & !errors.sum && !errors.name)
      //   setActiveStep(2);
    }


  };


  const videoRef = useRef(null);

  // useEffect(() => {//  קשור לוידיו אוטומטי          
  //   if (videoRef.current) {
  //     videoRef.current.play();
  //   }
  // }, [])

  return (
    <>
      <div className={color.colorValue === "black" ? "white" : "black"} >
        <img src={img} style={{ marginBottom: 130 ,width:"100%"}} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <form className="formDonate" onSubmit={handleSubmit(saveDetails)}>

            <Box sx={{ width: '100%', direction: "ltr", marginTop: "2ch" }}>
              <Stepper activeStep={activeStep} alternativeLabel>

                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <div className="donationDetails">

              <Box component="form" className="formDetails" noValidate autoComplete="off" >
                <TextField id="standard-basic" label="שם מלא*" variant="standard" error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}{...register("name")} />
              </Box>
              {/* sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} */}

              <Box component="form" className="formDetails" noValidate autoComplete="off" onChange={handleChange}>
                <TextField id="standard-basic" label="סכום*" variant="standard" error={!!errors.sum}
                  helperText={errors.sum ? errors.sum.message : ''}
                  {...register("sum")} />
              </Box>



            </div>
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '52ch' }, }} noValidate autoComplete="off" >
              <TextField id="standard-basic" label="הקדשה" variant="standard" />
            </Box>

            {activeStep == 1 && <div className="payment">
              <Box component="form" className="formDetails" noValidate autoComplete="off" >
                <TextField id="standard-basic" label="מספר אשראי*" variant="standard"
                  type="tel"
                  // {...register('credit')}
                  name="number"
                  placeholder="Card Number"
                  onChange={handleChanges}
                  onFocus={handleFocusChange}
                  maxLength={19}
                />

              </Box>
              {/* <span>{errors.credit?.message}</span> */}

              <Box component="form" className="formDetails" noValidate autoComplete="off" >
                <TextField id="standard-basic" label="בעל הכרטיס*" variant="standard"
                  type="text"
                  name="name"
                  placeholder="Cardholder Name"
                  onChange={handleChanges}
                  onFocus={handleFocusChange}
                />
              </Box>

              <Box component="form" className="formDetails" noValidate autoComplete="off" >
                <TextField id="standard-basic" label="תוקף הכרטיס*" variant="standard"
                  type="tel"
                  name="expiry"
                  placeholder="MM/YY "
                  onChange={handleChanges}
                  onFocus={handleFocusChange}
                  maxLength={5}
                />
              </Box>

              <Box component="form" className="formDetails" noValidate autoComplete="off" >
                <TextField id="standard-basic" label="cvc*" variant="standard"
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  onChange={handleChanges}
                  onFocus={handleFocusChange}
                  maxLength={4}
                />
              </Box>
            </div>}

            <div className="cardsend">

              <div className="card flex justify-content-center">

                <Stack direction="row" spacing={2} sx={{ marginRight: 6, marginTop: 18.3 }}>
                  <Button variant="contained" type="submit" disabled={!isValid} endIcon={
                    <CheckCircleOutlineIcon sx={{ marginRight: 3 }} />
                  }>תרום
                  </Button>
                </Stack>
              </div>
              <div style={{ marginLeft: 49 }}>
                <Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focused} />
              </div>

            </div>
          </form>

          <div style={{ marginRight: "50px", marginBottom: 130 }}>
            <video ref={videoRef} width="840px" height="532px" controls autoplay loop style={{backgroundColor:"black", border: "3px solid" }}>
              <source src={myVideo} type="video/mp4" />
              <source src="video.ogg" type="video/ogg" />
            </video>
          </div>
        </div>
      </div>
    </>)

};
export default MyForm;

