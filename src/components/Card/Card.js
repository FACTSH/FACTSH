import React from "react";
import "./card.css";
import linkedin from "../../assets/icons/linkedin1.svg";
import mail from "../../assets/icons/mail1.svg";

const Card = (props) => {
  const { PhDScholars, MTech, UG } = props;
  console.log(props);
  return (
    <div className="card-container">
      {props.ProfileData.map((profile, index) => (
        <div className="card" key={index}>
          {props.type === "0" ? (
            <img
              src={require(`../../assets/profile/${profile.image.length !== 0 ? profile.image : "avatar.png"
                }`)}
              alt="Card Image"
              className="card-image rounded-circle"
            />
          ) : (
            <img
              src={require(`../../assets/profile/${profile.image}`)}
              alt="Card Image"
              className="card-image rounded-circle"
            />
          )}
          <h5 className="card-description text-center ">
            {props.type === "1" || profile.linkedin.length==="" ? (
              <strong>{profile.name}</strong>
            ) : (
              <strong>
                <a className="plink"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.name}
                </a>
              </strong>
            )}
          </h5>
          {props.type === "1" ? (
            <center>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} width="40px" height="40px" />{" "}
              </a>{" "}
              <a href={`mailto:${profile.email}`}>
                <img src={mail} width="40px" height="40px" />
              </a>
            </center>
          ) : (
            <></>
          )}
          <h6 className="card-description text-center">
            {props.type === "1" ? profile.designation : profile.position}
          </h6>

          {props.type === "0" ? (
            <div></div>
          ) : (
            <ul className="more-info list-group list-unstyled">
              {profile.research.map((info, index) => (
                <li className="" key={index}>
                  {info}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Card;
