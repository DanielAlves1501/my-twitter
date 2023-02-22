import React from "react";
import styled from "styled-components";
import {
  AiOutlineHeart,
  AiOutlineRetweet,
  AiOutlineComment,
} from "react-icons/ai";
const Tweet = ({ tweet }) => {
  let date = `${tweet.timestamp}`;
  return (
    <TweetCard>
      <div className="profile-picture">
        <img src={tweet.profilePicture} alt="Profile Picture" />
      </div>
      <Content>
        <TweetInfo>
          <UserDetails>
            <span className="name">{tweet.name}</span>
            <span className="user">@{tweet.name}</span>
            <span className="date">{date.substring(5, 10)}</span>
          </UserDetails>
          <p>{tweet.content}</p>
        </TweetInfo>
        <BottomBar>
          <div className="bottom-bar__icon comment">
            <AiOutlineComment />
          </div>
          <div className="bottom-bar__icon like">
            <AiOutlineHeart />
          </div>
          <div className="bottom-bar__icon retweet">
            <AiOutlineRetweet />
          </div>
        </BottomBar>
      </Content>
    </TweetCard>
  );
};

const TweetCard = styled.div`
  padding: 15px;
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  height: auto;
  width: 100%;
  transition: background 0.3s ease;

  &:hover {
    background: #f7f7f7;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TweetInfo = styled.div``;

const UserDetails = styled.div`
  margin-bottom: 10px;
  .name {
    font-weight: 500;
    margin-right: 5px;
  }

  .user {
    color: #7f8b95;
    margin-right: 5px;
  }

  .date {
    color: #7f8b95;
  }
`;

const BottomBar = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 20px;

  .bottom-bar__icon {
    font-size: 19px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 35px;
    height: 35px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .comment {
    &:hover {
      color: #60b7f2;
      background: #e1eef7;
    }
  }

  .like {
    &:hover {
      color: #f963a8;
      background: #f8e0eb;
    }
  }

  .retweet {
    &:hover {
      color: #6fd5b3;
      background: #def1eb;
    }
  }
`;

export default Tweet;
