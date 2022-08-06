import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Box, Dialog, Paper } from "@mui/material";
import CreatePost from "../../pages/CreatePost";
import { useDispatch } from "react-redux";
import { authActions } from "../../core/slices/authSlice";
import SearchSelect from "../SearchSelect";
import { allLocationOptions } from "../../location";
import { userActions } from "../../core/slices/userSlice";
import { AddIcon, LogoutIcon, UserIcon } from "../../assets/icons";

export default function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <div className="navbar container">
        <Link to="/">
          {" "}
          <span className="logo">Koya</span>
        </Link>
        <SearchSelect
          className="search-bar"
          name="Search"
          placeholder="Search (Location/Tags)"
          options={allLocationOptions}
          noOptionsMessage={() => null}
        />
        <div className="nav-side">
          <div className="create-post" onClick={handleClickOpen}>
            <Box
              component="img"
              src={AddIcon}
              sx={{ height: "2rem", width: "2rem", cursor: "pointer" }}
            />
          </div>

          <Link to="/profile">
            <div className="profile">
              <Box
                component="img"
                src={UserIcon}
                sx={{ height: "2rem", width: "2rem", cursor: "pointer" }}
              />
            </div>
          </Link>

          <Link to="/login">
            <div
              className="sign-out"
              onClick={() => {
                dispatch(authActions.logout());
                dispatch(userActions.clearProfile());
              }}
            >
              <Box
                component="img"
                src={LogoutIcon}
                sx={{ height: "2rem", width: "2rem", cursor: "pointer" }}
              />
            </div>
          </Link>
        </div>
      </div>

      <Dialog
        className="create-post-dialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Paper sx={{ width: { sm: "40rem", md: "50rem" } }}>
          <CreatePost handleClose={handleClose} />
        </Paper>
      </Dialog>
    </div>
  );
}
