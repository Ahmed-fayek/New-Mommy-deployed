import "./styles.css";
import chiledimg from "../../../assets/images/chiledimgevents.svg";
import shareimg from "../../../assets/images/share.png";
import reminderimg from "../../../assets/images/reminder.svg";

const Events = () => {
  return (
    <>
      <div className="parentevents">
        <div className="main-containerevents">
          <div className="container-searchbutton ">
            <h3 className="header-searchbutton">ALL Events</h3>

            <form className="searchbox-container" action=".">
              <input
                type="search"
                className="searchbox"
                name="search"
                autoComplete="off"
                placeholder="search events"
              />
              <button
                type="submit"
                className="searchbutton fa fa-search"
              ></button>
            </form>
          </div>

          <div className="container-seeall">
            <p> Upcoming events</p>
            <a className="link-seeall" href="">
              See All
            </a>
          </div>

          <div className="container-card__white ">
            <p>Play date, Let’s play together</p>
            <div className="container-card__white__rightcontent">
              <div className="img-chiled">
                <img src={chiledimg} alt="img"></img>
              </div>
              <div className="container-card__white__lefetcontent ">
                <p className="container-card__white__lefetcontent ">
                  Central garden
                </p>
                <p className="container-card__white__lefetcontent ">
                  Fri, 8 JUL AT 10 Am
                </p>
                <button className="button__reminder">
                  <img src={reminderimg} alt="img"></img>
                  Set Reminder
                </button>

                <button className="share__button">
                  <img src={shareimg} alt="img"></img>
                  share
                </button>
              </div>
            </div>
          </div>

          <div className="container-card__white">
            <p>Play date, Let’s play together</p>
            <div className="container-card__white__rightcontent">
              <div className="img-chiled">
                <img src={chiledimg} alt="img"></img>
              </div>
              <div className="container-card__white__lefetcontent ">
                <p className="container-card__white__lefetcontent ">
                  Central garden
                </p>
                <p className="container-card__white__lefetcontent ">
                  Fri, 8 JUL AT 10 Am
                </p>
                <button className="button__reminder">
                  <img src={reminderimg} alt="img"></img>
                  Set Reminder
                </button>

                <button className="share__button">
                  <img src={shareimg} alt="img"></img>
                  share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Events;
