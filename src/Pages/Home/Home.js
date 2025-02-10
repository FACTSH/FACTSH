import React from "react";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import Card from "../../components/Card/Card";
import Heading from "../../components/Heading/Heading";
import ObjectiveData from "../../Content/objective";
import ProfileData from "../../Content/ProfileData";
import slides from "../../Content/slide";
import internpdf from "../../assets/images/publishedpaper.pdf";
import "./home.css";
import LatestNews from "../../components/LatestNews/LatestNews";
import News from "../../Content/LatestNews";
import ObjectiveCard from "../../components/ObjectiveCard/ObjectiveCard";

function Home() {
  console.log(ProfileData);
  return (
    <div >
      <div className="slider-container">
        <ImageSlider slides={slides} />
      </div>
      
      
      {/* </a> */}
          <LatestNews News={News} />
      <div className="text-center p-2">
        <Heading content="Welcome to the FACTSnp-H Lab" />
      </div>
      {/* <div className="side-by-side-container"> */}
        <h4 className="text-center my-5 mb-5 tx-color">
          We are dedicated to Advancing Responsible, Transparent, and Secure
          Computing. With a focus on fairness, accountability, and transparency,
          our lab integrates sociological and humanistic insights into computing
          solutions. Let's delve into how our interdisciplinary team and research
          areas are shaping the future of technology.
        </h4>
        {/* <div className="latest-news-container">
        </div> */}
      {/* </div> */}
      <div className="container">
        <div className="lab-info">
          {ObjectiveData.map((item, index) => (
            <ObjectiveCard
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
      <div className="container">
        <div className="lab-info">
        </div>
      </div>
      <Heading content="Faculty Members" />
      <div className="container" >
        <Card ProfileData={ProfileData.Faculty} type="1" />
      </div>
    </div>
  );
}

export default Home;
