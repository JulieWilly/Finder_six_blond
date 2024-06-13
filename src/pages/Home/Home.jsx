import { RiGitRepositoryFill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import './home.css'
import { IoMdLink } from "react-icons/io";
import { FaCodeFork } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import userImg from '../../assets/mombasainit.jpg'
import { FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const Network = ({followerImg, followerName}) => {
  return (
    <>
      <div className="followers">
        <div className="followerImg">
          <img src={followerImg} alt="" />
        </div>
        <h3>{followerName}</h3>
        <button>{<IoMdLink className="icons" />} View {followerName} </button>
      </div>
    </>
  );
}
const Title = ({title, number}) => {
    return <>
    <h1>{title} ({number})</h1>
    </>
}
const UserDetailsSect = ({cardTitle, cardDesc, forks, stars}) => {
    return (
      <>
        <div className="detailsSect">
          <Title title={"Repositories"} number={12} />
          <div className="repositories">
            <div className="card">
              <div className="cardTop">
                <h2>{cardTitle}</h2>
                <p>{cardDesc}</p>
              </div>
              <div className="cardBottom">
                <div className="items">
                  <p>
                    {<FaCodeFork />} {forks} Forks
                  </p>
                  <p>
                    {<FaStar />}
                    {stars} Stars
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Title title={"Followers"} number={32} />
          <div className="followersSect">
            <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
            <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
            <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
            <Network followerName={"Wilfred Kiama"} followerImg={userImg} />

            <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
          </div>
          <Title title={"Follows"} number={20} />
          <div className="followersSect">
            <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
            <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
            <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
            <Network followerName={"Wilfred Kiama"} followerImg={userImg} />

            <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
          </div>
        </div>
      </>
    );
}

const UserDetails = ({
  userImg,
  userName,
  userShortName,
  userDescription,
  userRepos,
  userFollowers,
  userFollows,
}) => {
  return (
    <section className="home_sect">
      <div className="user_section">
        <div className="userImg">
          <img src={userImg} alt="" />
        </div>
        <div className="userDesc">
          <h1> {userName}</h1>
          <p>{userShortName}</p>
          <p>{userDescription}</p>
          <button> {<FaExternalLinkAlt />}View on github</button>
          <div className="userNetwork">
            <p>
              {<RiGitRepositoryFill className="icons" />}
              {userRepos} repositories.
            </p>
            <p>
              {<IoIosPeople className="icons" />}
              {userFollowers} followers.
            </p>
            <p>
              {<IoIosPeople className="icons" />}
              {userFollows} following.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
const Home = () => {
  const[userDetails, setUserDetails] = useState();

  const fetchData = async () => {

    const responseData = await fetch("https://api.github.com/users/JulieWilly");
    const feedbackData = responseData.json();

    // console.log('Hello World')
    console.log(feedbackData)
    setUserDetails(feedbackData)
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div className="homeSect">
        <UserDetails
          userImg={userImg}
          userName={"JulieWilly"}
          userShortName={"JulieWilly"}
          userDescription={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem quasi similique eaque reiciendis obcaecati voluptate quae velit necessitatibus unde, nam, voluptates eligendi."
          }
          userRepos={12}
          userFollows={32}
          userFollowers={23}
        />

        <UserDetailsSect cardTitle={'Hello world in JavaScript'} cardDesc={'This repository contains javascript basics and examples.'} forks={12} stars={2}/>
      </div>
    </>
  );
};

export default Home;
