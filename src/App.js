import './App.css';
import NavBar from './NavBar';
import DonationsList from "./DonationsList";
import MyForm from "./MyForm"
import { useState, useEffect } from 'react';
import { ThemeContext,CoinContext  } from "./Contexts";
import ChoseColor from './ChoseColor';
import { Routes, Route } from 'react-router-dom';
import CampaignStatus from "./CampaignStatus";
import axios from "axios";
import "./Them.css";
import "./styleMui.css";
import Footer from './Footer';



function App() {


  const [DonationsArr, setDonationsArr] = useState([
    {
      name: "משפחת קובלסקי",
      dedication: "להצלחת הפרויקט בריאקט",
      sum: 8000,
      donationTime: new Date(2023, 11, 21, 3, 42),
    },
    {
      name: "צוות המורות בבית המורה",
      dedication: " לזכות התלמידות היקרות שתמצאנה עבודה טובה",
      sum: 60000,
      donationTime: new Date(2023, 11, 20, 3, 42),
    },
    {
      name: "בעילום שם",
      dedication: "",
      sum: 200000,
      donationTime: new Date(2023, 11, 21, 3, 42),
    },
    {
      name:  "אבי שטיין",
      dedication: "לזכות החטופים שיזכו לצאת משיעבוד לגאולה",
      sum: 32,
      donationTime: new Date(2023, 11, 22, 3, 42),
    },
    {
      name:  "סיון מינור",
      dedication: "לרפואת משה בן בת שבע",
      sum: 200,
      donationTime: new Date(2023, 11, 20, 3, 42),
    },
    {
      name: "גאולה מזרחי",
      dedication: "לזכות שלמה מזרחי",
      sum: 4500,
      donationTime: new Date(2023, 11, 21, 6, 52),
    },
    {
      name: "riki",
      dedication: "לכבוד הרבה שליטא",
      sum: 600,
      donationTime: new Date(2023, 11, 21, 3, 42),
    },
    {
      name: "libi",
      dedication: "",
      sum: 700,
      donationTime: new Date(2023, 11, 25, 3, 42),
    },
    {
      name: "ציפי",
      dedication: "לזכות אסתי",
      sum: 100,
      donationTime: new Date(2023, 11, 23, 3, 42),
    },
    {
      name: "דן גרטלר",
      dedication: "",
      sum: 60000,
      donationTime: new Date(2023, 11, 23, 3, 42),
    },
    {
      name: "דני יצמח",
      dedication: "",
      sum: 60000,
      donationTime: new Date(2023, 11, 22, 3, 42),
    },
    {
      name: "רב שלום",
      dedication: "לזכות תלמידי",
      sum: 5,
      donationTime: new Date(2023, 11, 15, 3, 42),
    },
    {
      name: "shnieor",
      dedication: "we want mashiach now",
      sum: 100,
      donationTime: new Date(2023, 11, 11, 3, 42),
    },
   
  ]);

  const fetchExchangeRate = async () => {
    const apiKey = '43feaada796bb450cdcee947';
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/ILS`);
      const exchangeRate = response.data.conversion_rate;
      changeDollarRate(exchangeRate);
    } catch (error) {
      console.error('Error fetching exchange rate:', error.message);
    }
  };



  useEffect(() => {
    fetchExchangeRate();
  }, []);

  let [theme, setTheme] = useState('white');
  const changeTheme = (color) => {
    setTheme(color);
  }
  let [coin, setCoin] = useState({ dollarAmount: undefined, currencyType: "shekel" });
  const changeCurrencyType = (cur) => {
    setCoin({ ...coin, currencyType: cur })
  }
  const changeDollarRate = (rate) => {
    setCoin({ ...coin, dollarAmount: rate })
  }


  return (
    <>
      <ThemeContext.Provider value={{ colorValue: theme, changeColorValue: changeTheme }}>
        <CoinContext.Provider value={{ coin: coin, changeCurrencyType: changeCurrencyType }}>
        <NavBar />
          <CampaignStatus DonationsArr={DonationsArr} />
          
          <ChoseColor />
          <Routes>
            <Route path="/" element={<DonationsList setDonationsArr={setDonationsArr} DonationsArr={DonationsArr}  />}></Route>
            <Route path="ToDonate" element={<MyForm setDonationsArr={setDonationsArr} />}></Route>
          </Routes>
          <Footer/>
        </CoinContext.Provider>
      </ThemeContext.Provider>


    </>
  );
}

export default App;
