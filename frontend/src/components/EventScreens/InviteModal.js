const Invitemodel = (props) => {
  return (
    <select
      onChange={(e) => props.sendInvite(props.event, props.description, e.target.value)}
      className="form-select form-select-sm"
      aria-label=".form-select-sm example"
    >
      <option>Select User To Invite</option>
      {props.users.map((element) => <option key={element.email} value={element.email}>{element.email}</option>)}
    </select>
  );
};
export default Invitemodel;
