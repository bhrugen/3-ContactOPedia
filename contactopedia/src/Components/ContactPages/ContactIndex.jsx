import { useState } from "react";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";

function ContactIndex() {
  const [contactList, setContactList] = useState([
    {
      id: 1,
      name: "Ben Parker",
      phone: "666-666-7770",
      email: "ben@dotnetmastery.com",
      isFavorite: false,
    },
    {
      id: 2,
      name: "Kathy Patrick",
      phone: "111-222-0000",
      email: "kathy@dotnetmastery.com",
      isFavorite: true,
    },
    {
      id: 3,
      name: "Paul Show",
      phone: "999-222-1111",
      email: "paul@dotnetmastery.com",
      isFavorite: true,
    },
  ]);

  function handleToggleFavorite(contact) {
    console.log(contact);
  }

  return (
    <div className="container" style={{ minHeight: "85vh" }}>
      <div className="py-3">
        <div className="row py-2">
          <div className="col-6">ADD CONTACT</div>
          <div className="col-6">REMOVE CONTACT</div>
        </div>
        <div className="py-2">
          <div className="col-12">FORM TO ADD NEW CONTACT</div>
        </div>
        <div className="py-2">
          <div className="col-12">
            <FavoriteContacts
              favoriteClick={handleToggleFavorite}
              contacts={contactList.filter((u) => u.isFavorite == true)}
            />
          </div>
        </div>
        <div className="py-2">
          <div className="col-12">
            <GeneralContacts
              favoriteClick={handleToggleFavorite}
              contacts={contactList.filter((u) => u.isFavorite == false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactIndex;
