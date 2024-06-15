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

const Network = ({ followerImg, followerName, displayUser }) => {
  return (
    <>
      <div className="followers">
        <div className="followerImg">
          <img src={followerImg} alt="Git user profile" />
        </div>
        <h3>{followerName}</h3>

        <button onClick={() => displayUser(followerName)}>
          {<IoMdLink className="icons" />} View {followerName}
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

const UserDetailsSect = ({ cardTitle, cardDesc, forks, stars, repoLink }) => {
  return (
    <>
      <div className="reposSect">
        <a href={repoLink} target="_blank">
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
        </a>
      </div>
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
  link,
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
          <a href={link} target="_blank">
            <button>{<FaExternalLinkAlt />}View on github</button>
          </a>
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
  const userName = getUserData((state) => state.userGitName);
  const userGitData = getUserData((state) => state.userGitData);
  const fetchDefaultValues = getUserData((state) => state.fetchData);
  const [userRepos, setUserRepos] = useState([]);
  const [userFollower, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchDefaultValues(userName);
  }, [userName, fetchDefaultValues]);

  const getUserDetails = async () => {
    setLoading(true);
    if (userName) {
      try {
        const userRepos = await fetch(
          `https://api.github.com/users/${userName}/repos`
        );
        if (userRepos == null) {
          console.log("djksjksdjks");
        }
        const resultRepos = await userRepos.json();
        setUserRepos(resultRepos);

        const userFollowers = await fetch(
          `https://api.github.com/users/${userName}/followers`
        );
        const userFollowersResult = await userFollowers.json();
        setUserFollowers(userFollowersResult);

        const userFollowing = await fetch(
          `https://api.github.com/users/${userName}/following`
        );
        const userFollowingResult = await userFollowing.json();
        setUserFollowing(userFollowingResult);
      } catch (e) {
        console.log("Failed to fetch user data", e);
      }
    } else {
      return <div>No user data available</div>;
    }
    setLoading(false);
  };

  const displayUser = (userName) => {
    fetchDefaultValues(userName);
    getUserDetails(userName);
  };

  useEffect(() => {
    getUserDetails();
  }, [userName]);

  return (
    <>
      <div className="homeSect">
        {isLoading ? (
          <p className="loading">Loading profile...Please wait...</p>
        ) : (
          userGitData && (
            <UserDetails
              userImg={userGitData.avatar_url}
              userName={userGitData.name}
              userRepos={userGitData.public_repos}
              userFollowers={userGitData.followers}
              userFollows={userGitData.following}
              userShortName={userGitData.login}
              userDescription={userGitData.bio}
              link={userGitData.html_url}
            />
          )
        )}

        <div className="detailsSect">
          {isLoading ? (
            <p className="loading">Loading GitHub's repos...Please wait...</p>
          ) : (
            <Title title={"Repositories"} number={userRepos.length} />
          )}

          <div className="repositories">
            {userRepos.map((repos, i) => (
              <UserDetailsSect
                key={i}
                cardTitle={repos.name}
                cardDesc={repos.description}
                forks={repos.forks}
                stars={repos.stars}
                repoLink={repos.clone_url}
              />
            ))}
          </div>

          {isLoading ? (
            <p className="loading">Fetching followers...Please wait...</p>
          ) : (
            <Title title={"Followers"} number={userFollower.length} />
          )}

          <div className="followersSect">
            {userFollower.map((followers, i) => (
              <Network
                key={i}
                followerImg={followers.avatar_url}
                followerName={followers.login}
                displayUser={displayUser}
              />
            ))}
          </div>

          {isLoading ? (
            <p className="loading">Fetching followers...Please wait...</p>
          ) : (
            <Title title={"Following"} number={userFollowing.length} />
          )}

          <div className="followersSect">
            {userFollowing.map((following, i) => (
              <Network
                followerImg={following.avatar_url}
                followerName={following.login}
                displayUser={displayUser}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
