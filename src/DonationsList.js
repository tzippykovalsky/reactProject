import React, { useState, useEffect, useContext } from "react";
import OneDonations from "./OneDonations";
import { ThemeContext } from "./Contexts";
import "./Them.css";
import { Box, InputLabel, MenuItem, FormControl, TextField, ImageList, ImageListItem, styled } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./OneDonations.css";
// import SearchIcon from '@mui/icons-material/Search';

const DonationsList = (props) => {


  //מערך שיכיל את התרומות לאחר חיפוש 
  const [filteredDonationsArr, setFilteredDonationsArr] = useState([]);
  //הערך שנכתב בתיבת החיפוש
  const [searchValue, setSearchValue] = useState("");
  //קשור למיון לפי mui
  const [sort, setSort] = React.useState('newD');

  useEffect(() => {
    // const sortedArr = [...props.DonationsArr].sort((a, b) => new Date(b.donationTime) - new Date(a.donationTime));
    // props.setDonationsArr(sortedArr);
      setFilteredDonationsArr(
        props.DonationsArr.filter((item) => item.name.includes(searchValue) || item.dedication.includes(searchValue))
      );
 
  }, [props.DonationsArr, searchValue]);// הפונקציה תתבצע בעת שינוי באחד השתנים הבאים


  const search = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);//useEffect מופעל כעת
  };

  const sorted = (e) => {
    const sortWay = e.target.value;
    if (sortWay === "sum") {
      const sortedArr = [...props.DonationsArr].sort((a, b) => b.sum - a.sum);
      setFilteredDonationsArr(sortedArr);
    } else if (sortWay === "newD") {
      const sortedArr = [...props.DonationsArr].sort((a, b) => new Date(b.donationTime) - new Date(a.donationTime));
      setFilteredDonationsArr(sortedArr);
    } else if (sortWay === "oldD") {
      const sortedArr = [...props.DonationsArr].sort((a, b) => new Date(a.donationTime) - new Date(b.donationTime));
      setFilteredDonationsArr(sortedArr);
    }
    setSort(e.target.value);
  };

  let color = useContext(ThemeContext);



  return (
    <>
      <div style={{ marginBottom: "0px" }} className={color.colorValue === "black" ? "white" : "black"}>

        <div style={{ display: "flex", marginLeft: "1040px" }}>
          <Box
            component="form"
            sx={{ '& > :not(style)': { width: '25ch' } }} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="... חפש  לפי שם או הקדשה" variant="standard" onChange={search} />
          </Box>

          <FormControl sx={{ width: "16ch", marginLeft: "3ch" }}>
            <InputLabel id="demo-simple-select-autowidth-label">מיין</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={sort}
              onChange={sorted}
              autoWidth
              label="Sort"

            >
              <MenuItem value="newD">חדש</MenuItem>
              <MenuItem value="oldD">ישן</MenuItem>
              <MenuItem value="sum">גובה התרומה</MenuItem>
            </Select>
          </FormControl>
        </div>

        {filteredDonationsArr.length > 0 ?(
          <ImageList sx={{ width: 1300, height: 600, border: 1, borderColor: "gray", marginLeft: 14.5 }}>
            <ImageListItem sx={{ marginLeft: 5 }}>
              <div className="alldonations">
                {filteredDonationsArr.map((item, index) => (
                  <div key={index}>
                    <OneDonations myDonations={item} />
                  </div>
                ))}
              </div>
            </ImageListItem>
          </ImageList>
        ):  <div style={{textAlign:"center"}}>לא נמצאו תרומות</div>}
        {/* {filteredDonationsArr.length === 0 && searchValue !== "" && (
          <div style={{textAlign:"center"}}>לא נמצאו תרומות</div>
        )} */}


      </div>
    </>
  );


};

export default DonationsList;