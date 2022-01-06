
const SingleEvent = (props) => {
    return (
        <>
            <li>
                creator-{props.creator}<br />
                {props.eventTitle}-{props.eventDescription}
            </li>
        </>
    )
}
export default SingleEvent