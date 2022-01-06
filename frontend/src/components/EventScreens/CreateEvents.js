import { useState } from "react";
import axios from "axios";
const CreateEvent = () => {
  const [eventTitle, seteventTitle] = useState("");
  const [eventDescription, setDescription] = useState("");
  const createUserEvent = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      };
      const eventdetails = {
        title: eventTitle,
        description: eventDescription,
      };
      const { data } = await axios.post(
        "/api/events/createEvents",
        eventdetails,
        config
      );
      console.log(data);
    } catch (error) {}
  };
  return (
    <div className="border-solid border border-indigo-600 w-2/4 m-4">
      <form onSubmit={createUserEvent} className="m-2">
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Event Title
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={eventTitle}
              onChange={(e) => seteventTitle(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="input-group">
            <span className="input-group-text">Event Description</span>
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={eventDescription}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="inline-block float-right">
        <button type="submit" className="btn btn-outline-primary mt-4">Add Event</button>
        </div>
        
      </form>
    </div>
  );
};
export default CreateEvent;
