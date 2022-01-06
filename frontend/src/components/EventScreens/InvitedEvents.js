import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleInvitedEvent from './SingleInvitedEvent'
import axios from 'axios';
const InvitedEventsScreen = () => {
    const history = useNavigate()
    const [events, setEvents] = useState([])
    useEffect(() => {
        if(!localStorage.getItem("auth")) {
            history("/login")
        }
        const fetchCreatedEvents = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("auth")}`
                }
            }
            try {
                const { data } = await axios.get("/api/events/AllInvitedEvents", config)
                setEvents(data.data)
            } catch (error) {
                console.log("locals storage auth deleted")
            }
        }
        fetchCreatedEvents()
    },[events])
    return (
        <div className='m-4'>
        <h3>Invited Events</h3>
            {events && events.map((element, index) => <ul><SingleInvitedEvent key={index} {...element}/></ul>)}
        </div>
        
    )
}
export default InvitedEventsScreen;