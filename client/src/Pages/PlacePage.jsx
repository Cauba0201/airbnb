/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacePage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addphoto, setAddphoto] = useState([]);
  const [photolink, setPhotolink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extranInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const inputHeader = (text) => {
    return <h2 className="text-xl mt-4 text-left">{text}</h2>;
  };
  const inputDescription = (text) => {
    <p className="text-left text-gray-500 text-sm">{text}</p>;
  };
  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photolink,
    });
    setAddphoto((prev) => {
      return [...prev, filename];
    });
    setPhotolink("");
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.set("photos", files);
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filename } = response;
        setAddphoto((prev) => {
          return [...prev, filename];
        });
      });
  };
  return (
    <div>
      {action !== "new" && (
        <div className="text-center mt-5">
          <Link
            className="bg-primary inline-flex gap-2 text-white py-2 px-6 rounded-full "
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            {preInput(
              "Title",
              "Title for the place, should be short and catchy as in advertisement" //chua hien thi decription
            )}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="For example... My love apt"
            />
            {preInput("Address", "Address to this place")}

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address: Chicago,USA"
            />
            {preInput("Photo", "Add this photo")}

            <div className="flex gap-2">
              <input
                type="text"
                value={photolink}
                onChange={(e) => setPhotolink(e.target.value)}
                placeholder={"add image.jpg"}
              />
              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 px-4 rounded-2xl"
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addphoto.length > 0 &&
                addphoto.map((link) => (
                  <div key={link.index}>
                    <img
                      className="rounded-2xl"
                      src={"http://localhost:4000/uploads/" + link}
                      alt=""
                    />
                  </div> //bug upload link
                ))}
              <label className="flex gap-1 cursor-pointer items-center justify-center border rounded-2xl">
                <input type="file" className="hidden" onChange={uploadPhoto} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </label>
            </div>
            {preInput("Description", "Description of the place")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {preInput("Perks", "Select all the perks")}
            <div className="grid grid-cols-2 mt-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra Info", "House rules, etc")}
            <textarea
              value={extranInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            {preInput(
              "Check in & Out times",
              "Add check in and out time. Remember to have some time window for cleanning the room between guests"
            )}
            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h4 className="text-xl mt-2 -mb-1 text-left">Check in time</h4>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="6:00 am"
                />
              </div>
              <div>
                <h4 className="text-xl mt-2 -mb-1 text-left">Check out time</h4>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="21:30 pm"
                />
              </div>
              <div>
                <h4 className="text-xl mt-2 -mb-1 text-left">
                  Max number of guests
                </h4>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  placeholder=" 2 adults, 2 children, 1 baby"
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
