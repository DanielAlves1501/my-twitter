import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsTwitter, BsSearch, BsBookmark } from "react-icons/bs";
import { RiHome7Fill } from "react-icons/ri";
import { GrNotification } from "react-icons/gr";
import { FiMail, FiMoreHorizontal } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { CiCircleMore } from "react-icons/ci";
import { TfiAngleDown } from "react-icons/tfi";
import Tweet from "../components/Tweet";

const Home = () => {
  const { user, tweets, setTweets } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  const [tweetInfo, setTweetInfo] = useState({});
  const navigate = useNavigate();
  const inputRef = useRef();

  const handlePopUpVisibility = (e) => {
    setIsVisible(!isVisible);
  };

  const handleTweetInfo = (e) => {
    setTweetInfo({
      ...tweetInfo,
      [e.target.name]: e.target.value,
      name: user.name,
      profilePicture: user.profilePicture,
      userId: user.userId,
    });
  };

  const getTweets = async () => {
    await fetch("http://localhost:3001/tweets")
      .then((res) => res.json())
      .then((res) => setTweets(res));
  };

  const handleTweetSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3001/tweets/createTweet", {
      method: "POST",
      body: JSON.stringify(tweetInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));

    getTweets();
    setTweetInfo({});
    inputRef.current.value = "";
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("login");
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <Container>
      <Header>
        <TwitterIcon />
        <Menu>
          <a href="#" className="menu-btn">
            <div>
              <RiHome7Fill className="icon" />
              <span>Inicio</span>
            </div>
          </a>
          <a href="#" className="menu-btn">
            <div>
              <BsSearch className="icon" />
              <span>Explorar</span>
            </div>
          </a>
          <a href="#" className="menu-btn">
            <div>
              <GrNotification className="icon" />
              <span>Notificaciones</span>
            </div>
          </a>
          <a href="#" className="menu-btn">
            <div>
              <FiMail className="icon" />
              <span>Mensajes</span>
            </div>
          </a>
          <a href="#" className="menu-btn">
            <div>
              <BsBookmark className="icon" />
              <span>Guardados</span>
            </div>
          </a>
          <a href="#" className="menu-btn">
            <div>
              <BiUser className="icon" />
              <span>Perfil</span>
            </div>
          </a>
          <a href="#" className="menu-btn">
            <div>
              <CiCircleMore className="icon" />
              <span>Mas opciones</span>
            </div>
          </a>

          <Profile onClick={handlePopUpVisibility}>
            <div className="profile-details">
              <div className="profile-picture">
                <img src={user.profilePicture} alt="Profile Picture" />
              </div>
              <div className="profile-info">
                <span className="name">{user.name}</span>
                <span className="user">@{user.name}</span>
              </div>
            </div>
            <MoreInfoIcon />
          </Profile>

          <LogOutPopUp className={isVisible ? "visible" : "hiden"}>
            <div className="line"></div>
            <div className="log-out">
              <span onClick={handleLogOut}>
                Cerrar la sesion de @{user.name}
              </span>
            </div>
          </LogOutPopUp>
        </Menu>
      </Header>

      <Main>
        <Feed>
          <h1>Inicio</h1>
          <WhatIsHappening>
            <div className="profile-picture">
              <img src={user.profilePicture} alt="Profile Picture" />
            </div>

            <InputContainer>
              <div className="privacy">
                <span>Todos</span>
                <TfiAngleDown fontSize={14} color="#1d9bf0" />
              </div>

              <form onSubmit={handleTweetSubmit}>
                <input
                  type="text"
                  placeholder="What is happening?"
                  name="content"
                  ref={inputRef}
                  onChange={handleTweetInfo}
                />
                <button>Twittear</button>
              </form>
            </InputContainer>
          </WhatIsHappening>
          <section className="tweets">
            {tweets.map((tweet) => {
              return <Tweet tweet={tweet} />;
            })}
          </section>
        </Feed>
        <Tendences>Tendences</Tendences>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 1300px;
  max-width: 95%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

// HEADER

// Menu

const Header = styled.header`
  width: 20%;
  height: 100vh;
  padding-top: 25px;
  position: fixed;
  border-right: 1px solid #e6e7e7;
`;

const TwitterIcon = styled(BsTwitter)`
  font-size: 32px;
  color: var(--blue);
  margin-bottom: 10px;
  margin-left: 15px;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;

  .menu-btn {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 20px;
    cursor: auto;

    div {
      padding: 15px;
      border-radius: 30px;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background: #e6e7e7;
      }
    }

    .icon {
      margin-right: 10px;
      font-size: 20px;
    }
  }
`;

const Profile = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 30px;
  padding: 15px;
  width: 95%;

  &:hover {
    background: #e6e7e7;
  }

  .profile-details {
    display: flex;
    align-items: center;

    .profile-info {
      display: flex;
      flex-direction: column;

      .name {
        font-weight: 600;
      }

      .user {
        color: #7f8b94;
      }
    }
  }
`;

const MoreInfoIcon = styled(FiMoreHorizontal)`
  font-size: 20px;
`;

const LogOutPopUp = styled.div`
  width: 280px;
  height: 133px;
  background: #fff;
  box-shadow: 0px 0px 8px var(--gray);
  border-radius: 15px;
  position: absolute;
  bottom: 120px;
  transition: all 0.3s ease;

  .line {
    position: absolute;
    left: 0;
    top: 15px;
    width: 100%;
    height: 1px;
    background: var(--light-gray);
  }

  .log-out {
    margin-top: 15px;
    cursor: pointer;
    padding: 20px 10px;
    &:hover {
      background: #f7f9f9;
    }

    span {
      font-weight: 400;
    }
  }
`;

// MAIN

const Main = styled.main`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin-left: 20vw;
`;

// Feed

const Feed = styled.section`
  width: 60%;
  height: 100%;

  h1 {
    font-weight: 400;
    padding-top: 15px;
    padding-left: 15px;
    padding-bottom: 60px;
    border-bottom: 1px solid var(--light-gray);
    font-size: 22px;
  }
`;

const WhatIsHappening = styled.div`
  position: relative;
  width: 100%;
  padding-left: 80px;
  padding-top: 10px;
  border-bottom: 1px solid var(--light-gray);
  padding-bottom: 10px;
  .profile-picture {
    position: absolute;
    top: 10px;
    left: 15px;
    width: 50px;
    height: 50px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  .privacy {
    border: 1px solid var(--light-gray);
    width: 90px;
    border-radius: 20px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
      background: rgba(29, 155, 240, 0.1);
    }

    span {
      margin-right: 5px;
      color: var(--blue);
      font-weight: 500;
      font-size: 14px;
    }
  }

  form {
    width: 100%;
    display: flex;
    align-items: end;
    flex-direction: column;

    input {
      width: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid var(--light-gray);
      padding: 30px 0;
      font-size: 20px;

      &::placeholder {
        font-size: 22px;
        font-family: "Chirp";
        font-weight: 300;
      }
    }

    button {
      background: var(--blue);
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 20px;
      margin-top: 15px;
      margin-right: 15px;
      font-weight: 600;
      font-family: "Chirp";
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background: #1d7fc2;
      }
    }
  }
`;

// Tendences

const Tendences = styled.section`
  width: 40%;
  height: 100vh;
  border-left: 1px solid var(--light-gray);
`;

export default Home;
