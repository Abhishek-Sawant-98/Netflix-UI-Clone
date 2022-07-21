import React from "react";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAppState,
  setMovieName,
  setTrailerId,
} from "../redux/slices/AppSlice";

const TrailerModal = () => {
  const { movieName, trailerId } = useSelector(selectAppState);
  const dispatch = useDispatch();

  const opts = {
    height: "350",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const resetTrailerData = () => {
    dispatch(setMovieName(""));
    dispatch(setTrailerId(""));
  };

  return (
    <div
      className="modal fade"
      id="trailerModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content bg-dark">
          <div className="modal-header border-0">
            <h5 className="modal-title text-light ms-2">
              {movieName + " - Trailer"}
            </h5>
            <button
              className="btn-close bg-light rounded-circle border-danger"
              data-bs-dismiss="modal"
              onClick={resetTrailerData}
            ></button>
          </div>
          <div className="modal-body">
            {trailerId && <YouTube videoId={trailerId} opts={opts} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
