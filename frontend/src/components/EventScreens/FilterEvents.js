import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingleEvent from "./SingleEvent";
import axios from "axios";
import Invitemodel from "./InviteModal";
import Pagination from "./Pagination";
const FilterEvents = () => {
  const history = useNavigate();
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      history("/login");
    }

    const fetchCreatedEvents = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      };
      try {
        const { data } = await axios.get("/api/events/AllEvents", config);
        setEvents(data.data);
      } catch (error) {
        console.log("locals storage auth deleted");
        localStorage.removeItem("auth");
      }
    };
    fetchCreatedEvents();
    getUsers()
  }, [events]);
  const sendInvite = async (event,description,email) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const event_info = {
      invitedUserEmail: email,
      eventTitle: event,
      eventDescription: description
    };
    try {
      const { data } = await axios.post(
        "/api/events/invite",
        event_info,
        config
      );
    } catch (error) {
      localStorage.removeItem("auth");
    }
  };

  const getUsers = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    };
    const { data } = await axios.get("/api/auth/getAllUsers", config);
    setUsers(data.users);
  };

  const paginate = (number) => {
    setCurrentPage(number);

  };
  const indexofLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexofLastPost - postsPerPage;
  const currentPosts = events.slice(indexofFirstPost, indexofLastPost);
  const logout = () => localStorage.removeItem("auth");
  return (
    <div className="m-4">
      
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          aria-label="Username"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span class="input-group-text">🔎</span>
      </div>

      <h3>Created Events</h3>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={events.length}
        paginate={paginate}
      />

      {events &&
        currentPosts
          .filter((val) => {
            if (text.trim() == "") {
              return val;
            } else if (
              val.eventTitle
                .toString()
                .toLowerCase()
                .includes(text.toString().toLowerCase())
            ) {
              return val;
            }
          })
          .map((element, index) => (
            <ul>
              <SingleEvent
                key={index}
                {...element}
                users={users}
                sendInvite={sendInvite}
              />
            </ul>
          ))}
      <button onClick={logout}>logout</button>
    </div>
  );
};
export default FilterEvents;
