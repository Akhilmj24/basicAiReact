import React, { useState } from "react";
import "./drawimage.scss";
import { Image } from "primereact/image";
import { toast } from "react-toastify";
import {
  imageProcessModel,
  textProcessModel,
} from "../../services/BasePostRes";

export default function DrawImage({ type, bannerText, btnText }) {
  const [inputText, setinputText] = useState("");
  const [resImage, setresImage] = useState([]);
  const [reseditText, setreseditText] = useState("");
  const [isloading, setisloading] = useState(false);

  const handleImageProcess = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") {
      toast.error("Please fill the field");
    } else {
      const data = {
        text: inputText,
      };
      if (type === "drawiImage") {
        imageProcessModel(data, setresImage, setisloading);
        setresImage([]);
      } else {
        textProcessModel(data, setreseditText, setisloading);
        setreseditText("");
      }
    }
  };
  return (
    <div className="container mt-5 drawImageConatiner">
      <div className="row">
        <form
          className="col-12 d-flex justify-content-center flex-column ps-5 pe-5 diInputSection"
          onSubmit={(e) => handleImageProcess(e)}
        >
          <textarea
            name=""
            id=""
            rows="3"
            placeholder="Enter your imaginations"
            value={inputText}
            onChange={(e) => setinputText(e.target.value)}
          ></textarea>
          <div className="textBtnSectionDI pt-2 d-flex justify-content-between">
            <small>{bannerText}</small>
            <button>{btnText}</button>
          </div>
        </form>
        <div className="col-12 pt-5 resultImgSection text-center">
          {type === "drawiImage" ? (
            <>
              {isloading && (
                <div className=" col-12 pt-5 d-flex justify-content-center pt-2 load">
                  <div className="one"></div>
                  <div className="two"></div>
                  <div className="three"></div>
                </div>
              )}

              {resImage?.map((picture) => (
                <div className="yourImageConatiner" key={picture.url}>
                  <Image src={picture.url} alt={inputText} preview />
                </div>
              ))}
            </>
          ) : (
            <>
              {isloading && (
                <div className=" col-12 pt-5 d-flex justify-content-center pt-2 load">
                  <div className="one"></div>
                  <div className="two"></div>
                  <div className="three"></div>
                </div>
              )}
              <div className="col-12 ps-5 pe-5">
                <h5>{reseditText}</h5>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
