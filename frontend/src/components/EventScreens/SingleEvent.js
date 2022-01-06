import Invitemodel from "./InviteModal";
const SingleEvent = (props) => {

  return (
    <div>
      <li>
        {props.eventTitle}-{props.eventDescription}
        <Invitemodel users={props.users} sendInvite={props.sendInvite} event={props.eventTitle} description={props.eventDescription}/>
      </li>
    </div>
  );
};
export default SingleEvent;
