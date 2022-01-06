import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleEvent from "./SingleEvent";
import axios from "axios";
import Invitemodel from "./InviteModal";
const CreatedEventsScreen = (props) => {
  const [visibility, setVisibility] = useState(false);
  const history = useNavigate();
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [invitedEventTitle, setInvitedEventTitle] = useState("");
  const [invitedEventDescription, setInvitedEventDescription] = useState("");
  // useEffect(() => {
  //     if(!localStorage.getItem("auth")) {
  //         history("/login")
  //     }

  //     const fetchCreatedEvents = async () => {
  //         const config = {
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: `Bearer ${localStorage.getItem("auth")}`
  //             }
  //         }
  //         try {
  //             const { data } = await axios.get("/api/events/AllEvents", config)
  //             setEvents(data.data)
  //         } catch (error) {
  //             console.log("locals storage auth deleted")
  //             localStorage.removeItem("auth")
  //         }
  //     }
  //     fetchCreatedEvents()
  // },[events])

  const sendInvite = async (email) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const event_info = {
      invitedUserEmail: email,
      eventTitle: invitedEventTitle,
      eventDescription: invitedEventDescription,
    };
    try {
      const { data } = await axios.post(
        "/api/events/invite",
        event_info,
        config
      );
    } catch (error) {}
  };

  const getUsers = async (title, description) => {
    setInvitedEventTitle(title);
    setInvitedEventDescription(description);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const { data } = await axios.get("/api/auth/getAllUsers", config);
    setUsers(data.users);
    setVisibility(true);
  };

  return (
    <div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          aria-label="Text input with dropdown button"
        />
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <a class="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </li>
        </ul>
      </div>

      <h3>Created Events..</h3>
      {props.events &&
        props.events.map((element, index) => (
          <ul>
            <SingleEvent key={index} {...element} inviteUser={getUsers} />
          </ul>
        ))}
      {visibility && <Invitemodel users={users} sendInvite={sendInvite} />}
    </div>
  );
};
export default CreatedEventsScreen;
