import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

const ManageFavorites = (props) => {
  const [favs, setFavs] = useState(
    Array.isArray(Object.keys(props.favs)) ? Object.keys(props.favs) : []
  );
  var favsTimestamps = props.favs;
  const [remove, setRemove] = useState(new Set());
  const notify = () =>
    toast.success("Successfully Removed", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const checkboxRef = useRef();
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    console.log(favs);
    console.log(
      favs.filter((fav) => {
        if (props.reverseDelete) {
          return remove.has(fav);
        }
        return !remove.has(fav);
      })
    );
    if (remove.size === favs.length && remove.size !== 0) {
      setIsIndeterminate(false);
      setAllSelected(true);
    } else if (remove.size > 0) {
      setIsIndeterminate(true);
      setAllSelected(true);
    } else if (remove.size == 0) {
      setIsIndeterminate(false);
    }
  }, [remove]);

  useEffect(() => {
    checkboxRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  const updateResources = () => {
    const newFavs = favs.filter((fav) => {
      if (props.reverseDelete) {
        return remove.has(fav);
      }
      return !remove.has(fav);
    });

    console.log(favsTimestamps);
    Object.entries(favsTimestamps).forEach(([key, value]) => {
      console.log("key", key);
      if (remove.has(key)) {
        delete favsTimestamps[key];
      }
    });

    console.log(
      favs.filter((fav) => {
        return !remove.has(fav);
      })
    );
    fetch(props.url, {
      method: props.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: localStorage.getItem("token"),
        favorites: favsTimestamps,
      }),
    })
      .then(async (response) => {
        console.log(localStorage.getItem("token"));
        console.log(await response.json());
      })
      .then(() => {
        notify();
        setAllSelected(false);
        setIsIndeterminate(false);
        console.log("newFavs", newFavs);
        console.log("remove", remove);
        if (props.reverseDelete) {
          setFavs(
            favs.filter((fav) => {
              return !remove.has(fav);
            })
          );
        } else {
          setFavs(newFavs);
        }
        setRemove(new Set());
      });
  };

  return (
    <div>
      <ToastContainer />
      <Button
        disabled={remove.size == 0}
        style={{ margin: 20, marginLeft: 0 }}
        onClick={() => {
          updateResources();
        }}
      >
        Remove Selected
      </Button>
      <Table striped bordered hover>
        {/* <table> */}
        <thead>
          <tr>
            <th>
              <input
                ref={checkboxRef}
                className="form-check-input"
                type="checkbox"
                checked={allSelected}
                onChange={(event) => {
                  if (allSelected) {
                    setAllSelected(false);
                    setRemove(new Set());
                  } else {
                    setRemove(new Set(favs));
                  }
                }}
              />
            </th>
            <th>#</th>
            <th>Date Added</th>
            <th>Name</th>
            <th>Topic</th>
            <th>Experience Level</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {props.resources
            .filter((resource) => {
              return favs.includes(resource.url);
            })
            .map((resource, i) => {
              return (
                <tr key={i}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={remove.has(resource.url)}
                      onChange={(event) => {
                        let newRemove = new Set(remove);
                        if (event.target.checked) {
                          newRemove.add(resource.url);
                        } else {
                          newRemove.delete(resource.url);
                        }
                        setRemove(newRemove);
                      }}
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(favsTimestamps[resource.url])}
                  </td>
                  <td>{resource.name}</td>
                  <td>{resource.topic}</td>
                  <td>{resource.experience_level}</td>
                  <td>
                    <a href={"http://" + resource.url}>{resource.url}</a>
                  </td>
                </tr>
              );
            })}
        </tbody>
        {/* </table> */}
      </Table>
    </div>
  );
};

const starFilled = (
  <svg
    style={{ width: 25 }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path
      fill="var(--primary)"
      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
    />
  </svg>
);
const starEmpty = (
  <svg
    style={{ width: 25 }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path
      fill="var(--primary)"
      d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"
    />
  </svg>
);

export default ManageFavorites;
