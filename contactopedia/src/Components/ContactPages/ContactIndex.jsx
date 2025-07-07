import { useState } from "react";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";
import AddContact from "./AddContact";

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

  const [selectedContact, SetSelectedContact] = useState(null);
  const [isUpdating, SetIsUpdating] = useState(false);

  function handleUpdateClick(contact) {
    console.log(contact);
    SetSelectedContact(contact);
    SetIsUpdating(true);
  }

  function handleToggleFavorite(contact) {
    setContactList((prevState) => {
      return prevState.map((obj) => {
        if (obj.id == contact.id) {
          return { ...obj, isFavorite: !obj.isFavorite };
        }
        return obj;
      });
    });
  }

  function handleUpdateContact(contact) {
    setContactList((prevState) => {
      return prevState.map((obj) => {
        if (obj.id == contact.id) {
          return {
            ...obj,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          };
        }
        return obj;
      });
    });

    SetSelectedContact(null);
    SetIsUpdating(false);
    return { status: "success", msg: "Contact was updated successfully." };
  }

  function handleAddContact(newContact) {
    //validation
    const duplicateRecord = contactList.filter((x) => {
      if (x.name == newContact.name && x.phone == newContact.phone) {
        return true;
      }
    });

    if (duplicateRecord.length > 0) {
      return { status: "error", msg: "Duplicate record." };
    }

    const newFinalContact = {
      ...newContact,
      id:
        contactList.length > 0 ? contactList[contactList.length - 1].id + 1 : 1,
      isFavorite: false,
    };
    setContactList((prevState) => {
      return prevState.concat([newFinalContact]);
    });

    return { status: "success", msg: "Contact was added successfully." };
  }

  function handleDeleteContact(contactId) {
    console.log(contactId);
    setContactList((prevState) => {
      return prevState.filter((obj) => {
        if (obj.id !== contactId) {
          return true;
        } else {
          return false;
        }
      });
    });
  }

  function handleRemoveAllContact() {
    setContactList([]);
  }

  function handleCancelUpdateContact() {
    SetSelectedContact(null);
    SetIsUpdating(false);
  }

  return (
    <div className="container" style={{ minHeight: "85vh" }}>
      <div className="py-3">
        <div className="row py-2">
          <div className="col-6">ADD CONTACT</div>
          <div className="col-6">
            <button
              className="btn btn-danger form-control"
              onClick={handleRemoveAllContact}
            >
              Remove All
            </button>
          </div>
        </div>
        <div className="py-2">
          <div className="col-12">
            <AddContact
              handleAddContact={handleAddContact}
              isUpdating={isUpdating}
              handleUpdateContact={handleUpdateContact}
              selectedContact={selectedContact}
              cancelUpdateContact={handleCancelUpdateContact}
            />
          </div>
        </div>
        <div className="py-2">
          <div className="col-12">
            <FavoriteContacts
              favoriteClick={handleToggleFavorite}
              deleteClick={handleDeleteContact}
              updateClick={handleUpdateClick}
              contacts={contactList.filter((u) => u.isFavorite == true)}
            />
          </div>
        </div>
        <div className="py-2">
          <div className="col-12">
            <GeneralContacts
              handleAddContact={handleAddContact}
              favoriteClick={handleToggleFavorite}
              updateClick={handleUpdateClick}
              deleteClick={handleDeleteContact}
              contacts={contactList.filter((u) => u.isFavorite == false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactIndex;
