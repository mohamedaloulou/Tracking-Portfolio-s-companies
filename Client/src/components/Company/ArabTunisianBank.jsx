import Score from '../../pages/Score';
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
const ATB = () => {
  const [atb, setAtb] = useState([]);
  const [atb_forecast, setAtb_forecast] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5001/atb");
        setAtb(res.data);
      } catch (err) {
        console.log(err);
      }

      try {
        const ress = await axios.get("http://localhost:5001/atb_forecast");
        setAtb_forecast(ress.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  const nonNullNews = atb.filter(item => item && item.news);
  const firstNonNullNews = atb.find(item => item && item.news) || {news: '', date: ''};
  const secondNonNullNews = nonNullNews.length > 1 ? nonNullNews[1] : {news: '', date: ''};
  const thirdNonNullNews = nonNullNews.length > 2 ? nonNullNews[2] : {news: '', date: ''};
  return (
    <>
      <canvas ref={chartRef} />
      <Score  title="ARAB TUNISIAN BANK" 
              ord={atb.slice(0, 50).map((item) => item.date.split('T')[0])}
              abs={atb.slice(0, 50).map((item) => item.close)}
              DateN1={firstNonNullNews.date.split('T')[0]}
              N1={firstNonNullNews.news} 
              DateN2={secondNonNullNews.date.split('T')[0]}
              N2={secondNonNullNews.news}
              DateN3={thirdNonNullNews.date.split('T')[0]}
              N3={thirdNonNullNews.news}
              D1={atb_forecast[0]?.day_1}
              D2={atb_forecast[0]?.day_2}
              D3={atb_forecast[0]?.day_3}
              D4={atb_forecast[0]?.day_4}
              D5={atb_forecast[0]?.day_5} />
 </>
 );
};

export default ATB;