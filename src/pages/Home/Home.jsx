import { RiGitRepositoryFill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import "./home.css";
import { IoMdLink } from "react-icons/io";
import { FaCodeFork } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import userImg from "../../assets/mombasainit.jpg";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import getUserData from "../../store/gitInforStore";
import { SlUserFollowing } from "react-icons/sl";

const Network = ({ followerImg, followerName }) => {
  return (
    <>
      <div className="followers">
        <div className="followerImg">
          <img src={followerImg} alt="" />
        </div>
        <h3>{followerName}</h3>
        <button>
          {<IoMdLink className="icons" />} View {followerName}{" "}
        </button>
      </div>
    </>
  );
};
const Title = ({ title, number }) => {
  return (
    <>
      <h1>
        {title} ({number})
      </h1>
    </>
  );
};

const UserDetailsSect = ({ cardTitle, cardDesc, forks, stars }) => {
  return (
    <>
      {/* <Title title={"Repositories"} number={0} /> */}
      <div className="reposSect">
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

      {/* <Title title={"Followers"} number={0} />
        <div className="followersSect">
          <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
        </div>
        <Title title={"Follows"} number={0} />
        <div className="followersSect">

          <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
        </div> */}
    </>
  );
};

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
  const { userGitName } = getUserData();
  const [userData, setUserData] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [userFollower, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserDetails = async () => {
    try {
      const fetchUserData = await fetch(
        "https://api.github.com/users/JulieWilly"
      );

      const userDataResult = await fetchUserData.json();
      setUserData(userDataResult);

      const userRepos = await fetch(
        "https://api.github.com/users/JulieWilly/repos"
      );
      const resultRepos = await userRepos.json();
      setUserRepos(resultRepos);

      const userFollowers = await fetch(
        "https://api.github.com/users/JulieWilly/followers"
      );
      const userFollowersResult = await userFollowers.json();
      setUserFollowers(userFollowersResult);

      const userFollowing = await fetch(
        "https://api.github.com/users/JulieWilly/following"
      );
      const userFollowingResult = await userFollowing.json();
      setUserFollowing(userFollowingResult);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <div className="homeSect">
        {
          <UserDetails
            userImg={userData.avatar_url}
            userName={userData.name}
            userRepos={userData.public_repos}
            userFollowers={userData.followers}
            userFollows={userData.following}
            userShortName={userData.login}
            userDescription={userData.bio}
          />
        }

        <div className="detailsSect">
          <Title title={"Repositories"} number={userRepos.length} />
          <div className="repositories">
            {userRepos.map((repos, i) => (
              <UserDetailsSect
                cardTitle={repos.name}
                cardDesc={repos.description}
                forks={repos.forks}
                stars={repos.stars}
              />
            ))}
          </div>
          <Title title={"Followers"} number={userFollower.length} />

          <div className="followersSect">
            {userFollower.map((followers, i) => (
              <Network
                followerImg={followers.avatar_url}
                followerName={followers.login}
              />
            ))}
          </div>

          <Title title={"Following"} number={userFollowing.length} />

          <div className="followersSect">
            {userFollowing.map((following, i) => (
              <Network
                followerImg={following.avatar_url}
                followerName={following.login}
              />
            ))}
          </div>
        </div>

        {/* <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
        <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
        <Network followerName={"Wilfred Kiama"} followerImg={userImg} />
        <Network followerName={"Wilfred Kiama"} followerImg={userImg} /> */}
      </div>
    </>
  );
};

export default Home;
