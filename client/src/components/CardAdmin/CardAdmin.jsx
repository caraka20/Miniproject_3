import React from "react";
//sibling components
import Button from "../Button/Button";
import "./card.css"
const CardAdmin = () => {
  return (
    <div className="card w-auto shadow-xl bg-white rounded-2xl px-[10px]">
      <figure>
        <img
          src="https://cdn1-production-images-kly.akamaized.net/EjwV7j3Y4JrlqUFuavke4NtRWtM=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3108566/original/079979700_1587487794-Sajiku_1.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title mt-[10px]">Nasi Goreng</h2>
        <p className="mt-[10px] text-sm text-gray-400">Nasi, Telor, Kerupuk, Sayuran</p>
        <p className="mt-[10px] text-sm text-gray-400">Rp. 10.000</p>
        <div className="flex card-actions gap-3 justify-end ">
          <Button  btnName="Edit" btnCSS="my-[10px] w-[150px] text-sm"/>
          <Button btnName="Delete" btnCSS = "my-[10px] w-[150px] text-sm"/>
        </div>
      </div>
    </div>
  );
};

export default CardAdmin;