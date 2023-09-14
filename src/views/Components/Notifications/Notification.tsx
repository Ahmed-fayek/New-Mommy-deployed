
import notifecation from "../../../assets/images/notifacationss.svg";

function Notification(props: any) {
  const not = props;

  return (
<>


<img src={notifecation} alt="" className="notifecation"></img>,

   
    <div className="notification">
      <p>{not.nots.id}</p>
      <p>{not.nots.date}</p>
      <p>{not.nots.mainmsg}</p>
      <p>{not.nots.smallmsg}</p>
    </div>
    </>
  );
}

export default Notification;
