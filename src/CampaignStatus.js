import React, { useState, useEffect, useContext } from "react";
import { Box, Slider, Paper, Stack, styled } from '@mui/material';
import { CoinContext, ThemeContext } from "./Contexts";
import myImage from './images/boneiolam_riverdaleevent2023_newertopbanner3.gif';
import {fromShekelToX} from "./dollarUtils"


const CampaignStatus = ({ DonationsArr }) => {
  const totalSum = DonationsArr.reduce((accumulator, donation) => accumulator + donation.sum, 0);
  let [sumDonations, setSumDonations] = useState(totalSum);
  const [sliderValue, setSliderValue] = useState(0);

  const goalCampaign = 8000000;


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  useEffect(() => {

    setSumDonations((prevSum) => {
      const newSum = prevSum + DonationsArr[DonationsArr.length - 1].sum;
      setSliderValue(Math.round(100 * newSum / goalCampaign));
      return newSum;
    });

  }, [DonationsArr]);
  
  let coin = useContext(CoinContext);
  let color = useContext(ThemeContext);
  return (
    <>
      <body className={color.colorValue === "black" ? "white" : "black"}>

        <img style={{ width: " 100%" }} src={myImage} alt="Description of the image" />

        <div style={{ marginLeft: 451, marginTop: 100 }}>



          <Stack direction="row" spacing={5} >
            <Item className={color.colorValue === "black" ? "itemInStatus" : ""} sx={{ bgcolor: "#bda35c", width: 170, color: "black" }}>
              <span>יעד הקמפיין</span>
              <div >₪ 8,000,000 </div>

            </Item>
            <Item sx={{ bgcolor: "#bda35c", width: 170, color: "black" }}>
              <span>מספר התורמים</span>
              <div >{DonationsArr.length}</div>
            </Item>
            <Item sx={{ bgcolor: "#bda35c", width: 170, color: "black" }}>
              <span>סכום</span>
              <div >{coin.coin.currencyType == "shekel" && " ₪ "}
                {Math.round(fromShekelToX(sumDonations, coin.coin.dollarAmount, coin.coin.currencyType)).toLocaleString()}
                {coin.coin.currencyType == "dollar" && " $ "}
              </div>
            </Item>
          </Stack>
           <Box>
            <Slider sx={{ width: 550, color: "rgb(36, 52, 83)", height: 12, marginTop: 4, marginLeft: 5 }}
              value={sliderValue} aria-label="Default" valueLabelDisplay="auto" />
          </Box> 
 
  
        </div>

      </body>
    </>);
}
export default CampaignStatus;

