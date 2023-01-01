import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/core/NavBar/NavBar";
import Chat from "./components/pages/Chat/Chat";
import { ToastContainer } from "react-toastify";
import DrawImage from "./components/pages/DrawImg/DrawImage";
function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route
            path="/draw_image"
            element={
              <DrawImage
                type={"drawiImage"}
                bannerText={
                  "Converts your imaginations into a image through your words"
                }
                btnText={"Convert into image"}
              />
            }
          />
          <Route
            path="/check_your_text"
            element={
              <DrawImage
                type={"checkText"}
                bannerText={"Check spelling in your sentence"}
                btnText={"Process my text"}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
