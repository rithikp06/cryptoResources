import React, { useState, useEffect } from "react";

const CryptoPrice = ({ token }) => {
  const [price, setPrice] = useState(0);
  useEffect(() => {
    getPrice(setPrice, token);
  }, []);
  return (
    <>
      {price == 0 ? (
        <div data-testid="price"></div>
      ) : (
        <h4 data-testid="price">
          {token} price: {price} USD
        </h4>
      )}
    </>
  );
};
const getPrice = async (setPrice, token) => {
  fetch(`https://coins.llama.fi/prices/current/coingecko:${token}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      setPrice(data["coins"][`coingecko:${token}`]["price"]);
    });
};

export default CryptoPrice;
