import React, { useState } from "react";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
          <div>
          <Header />
          <Body />
          </div>
          <div>
            <Footer />
          </div>
      </Fragment>
    
  );
}
