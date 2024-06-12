import { RiGitRepositoryFill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import './home.css'
import userImg from '../../assets/mombasainit.jpg'
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
    <section className="homeSect">
      <div className="user_section">
        <div className="userImg">
          <img src={userImg} alt="" />
        </div>
        <div className="userDesc">
          <h1> {userName}</h1>
          <p>{userShortName}</p>
          <p>{userDescription}</p>
          <button>View on github</button>
          <div className="userNetwork">
            <p>
              {<RiGitRepositoryFill />}
              {userRepos} repositories.
            </p>
            <p>
              {<IoIosPeople />}
              {userFollowers} followers.
            </p>
            <p>
              {<IoIosPeople />}
              {userFollows} following.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
const Home = () => {
  return (
    <>

      <UserDetails
        userImg={userImg}
        userShortName={"JulieWilly"}
        userDescription={
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem quasi similique eaque reiciendis obcaecati voluptate quae velit necessitatibus unde, nam, voluptates eligendi atque ex, eos ea numquam molestiae nemo aliquam."
        }
        userRepos={12}
        userFollows={32}
        userFollowers={23}
      />
    </>
  );
};

export default Home;
