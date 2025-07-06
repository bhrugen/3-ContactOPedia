import Contact from "./Contact";

function FavoriteContacts(props) {
  console.log(props);
  return (
    <div
      className="col-12 p-2"
      style={{ borderRadius: "10px", backgroundColor: "#323637" }}
    >
      <div className="text-center text-white-50">Favorites</div>
      <div className="p-2">
        {props.contacts.map((contact, index) => (
          <Contact contact={contact} key={index}></Contact>
        ))}
      </div>
    </div>
  );
}

export default FavoriteContacts;
