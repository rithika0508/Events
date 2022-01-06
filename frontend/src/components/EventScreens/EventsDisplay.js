import CreateEvent from "./CreateEvents"
import CreatedEventsScreen from "./AllEvents"
import InvitedEventsScreen from "./InvitedEvents";
import FilterEvents from './FilterEvents';
const EventsDisplay = () => {
    
    return (
        <>
            <CreateEvent /><br></br>
            <FilterEvents />
            <InvitedEventsScreen />
        </>
    )
}
export default EventsDisplay    