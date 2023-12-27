import "./OneDonations.css";
import React, { useContext } from "react";
import { CoinContext } from "./Contexts";
import { fromShekelToX } from "./dollarUtils";
import { Card, CardHeader, CardContent, Avatar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const OneDonations = ({ myDonations }) => {

  let coinType = useContext(CoinContext);
  const timeAgo = calculateTimeAgo(myDonations.donationTime);

  function calculateTimeAgo(date) {
    const currentDate = new Date();
    const differenceInMinutes = Math.floor((currentDate - date) / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInMinutes / (60 * 24));

    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} דקות `;
    } else if (differenceInHours < 24) {
      return `${differenceInHours} שעות `;
    } else {
      return `${differenceInDays} ימים `;
    }
  }

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: 'rgb(72, 94, 138)',
    },
    '& .MuiRating-iconHover': {
      color: "rgb(36, 52, 83)",
    },
  });

  return (
    <>


      <Card sx={{ minWidth: 350, height: 150, m: 2 }}>
        <CardHeader color="black"
          avatar={<Avatar sx={{ bgcolor: "#bb9a3d" }} alt={myDonations.name} src=" " />}
          action={<IconButton aria-label="settings" color="black">
            {coinType.coin.currencyType == "shekel" && "₪"} {Math.round(fromShekelToX(myDonations.sum, coinType.coin.dollarAmount, coinType.coin.currencyType))}  {coinType.coin.currencyType != "shekel" && "$"}
          </IconButton>}
          title={myDonations.name}
          subheader={`התקבלה לפני ${timeAgo}`}
        />
        <CardContent>
          <Typography variant="body2" color="black" component="p">
            {myDonations.dedication}
          </Typography>

          <StyledRating sx={{marginLeft:40}}
            name="customized-color"
            defaultValue={0}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            max={1} />
        </CardContent>
      </Card>
    </>
  );
};
export default OneDonations;
