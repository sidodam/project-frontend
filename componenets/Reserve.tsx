// @ts-nocheck
import { AiOutlineClose } from "react-icons/ai";
import useFetch from "../componenets/hooks/useFetch";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../componenets/AuthContext";
import { searchState } from "../componenets/searchState";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import axios from "axios";

interface ReserveProps {
  setOpen: any;
  hotelId: any;
}

function Reserve({ setOpen, hotelId }: ReserveProps) {
  const { data, loading, error } = useFetch(`https://weak-lime-sea-urchin-cap.cyclic.app/api/hotels/room/${hotelId}`);

  const [selectedRooms, setSelectedRooms] = useState([]);
  const obj = useRecoilValue(searchState);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(obj.startDate, obj.endDate);

  console.log("allDates", allDates);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => allDates.includes(new Date(date).getTime()));

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
  };

  const router = useRouter();

  const handleClick = async () => {
    const uniq = [...new Set(allDates)];

    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`https://weak-lime-sea-urchin-cap.cyclic.app/api/rooms/availibility/${roomId}`, {
            dates: uniq,
          });
          console.log("uniq", uniq);
          return res.data;
        })
      );
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer mx-5">
        <AiOutlineClose onClick={() => setOpen(false)} className="rClose" />
        <span>Select your rooms:</span>
        {data.map((item: any) => {
          return (
            <div key={item._id} className="rItem ">
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="rSelectRooms flex flex-col gap-3">
                {item.roomNumbers.map((roomNumber: any, index) => {
                  return (
                    <div key={index} className="flex  gap-2">
                      <label className="text-sm">{roomNumber.number}</label>

                      <input
                        type="checkbox"
                        className="scale-150 self-center"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />

                      <span className={`text-red-600 self-center text-sm ${!isAvailable(roomNumber) ? "" : "hidden"}`}>
                        Room is reserved , Sorry!!
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <button className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
}

export default Reserve;
