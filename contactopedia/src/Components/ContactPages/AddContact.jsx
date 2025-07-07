import { useState, useEffect } from "react";

function AddContact(props) {
  const [messages, SetMessages] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const [formData, SetFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (props.isUpdating && props.selectedContact) {
      SetFormData({
        name: props.selectedContact.name,
        email: props.selectedContact.email,
        phone: props.selectedContact.phone,
      });
    } else {
      SetFormData({
        name: "",
        email: "",
        phone: "",
      });
    }
  }, [props.isUpdating, props.selectedContact]);

  function handleFormInputChange(e) {
    const { name, value } = e.target;
    SetFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleAddContactForm(formData) {
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      console.log(contactData);
      let response = undefined;

      if (props.isUpdating && props.selectedContact) {
        //update
        response = props.handleUpdateContact({
          id: props.selectedContact.id,
          isFavorite: props.selectedContact.isFavorite,
          ...contactData,
        });
      } else {
        //creating
        response = props.handleAddContact(contactData);
      }

      if (response.status == "success") {
        SetMessages({ errorMessage: undefined, successMessage: response.msg });
        if (!props.isUpdating) {
          SetFormData({
            name: "",
            email: "",
            phone: "",
          });
        }
      } else {
        SetMessages({
          errorMessage: response.msg,
          successMessage: undefined,
        });
      }
    } catch (error) {
      console.error("Error adding contact", error);
      SetMessages({
        errorMessage: "Error Encountered",
        successMessage: undefined,
      });
    }
  }

  return (
    <div className="border col-12 text-white p-2">
      <form action={handleAddContactForm}>
        <div className="row p-2">
          <div className="col-12 text-white-50 text-center h5">
            {props.isUpdating ? "Update Contact" : " Add a new Contact"}
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              placeholder="Name..."
              name="name"
              value={formData.name}
              onChange={handleFormInputChange}
              className="form-control form-control-sm"
            />
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              name="email"
              value={formData.email}
              onChange={handleFormInputChange}
              placeholder="Email..."
              className="form-control form-control-sm"
            />
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleFormInputChange}
              placeholder="Phone..."
              className="form-control form-control-sm"
            />
          </div>

          {messages.successMessage && (
            <div className="col-12 text-center text-success">
              {messages.successMessage}
            </div>
          )}
          {messages.errorMessage && (
            <div className="col-12 text-center text-danger">
              {messages.errorMessage}
            </div>
          )}
          <div className={`${props.isUpdating ? "col-6" : "col-12"}`}>
            <button className="btn btn-primary btn-sm form-control">
              {props.isUpdating ? "Update" : " Create Contact"}
            </button>
          </div>
          {props.isUpdating && (
            <div className="col-6">
              <button
                className="btn btn-danger btn-sm form-control"
                onClick={() => props.cancelUpdateContact()}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddContact;
