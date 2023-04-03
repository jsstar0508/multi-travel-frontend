import React, { FC, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { AppState, useAppDispatch } from "store";
import { logOut } from "state/auth/action";

export interface LogOutProps {
  className?: string;
}

const LogOut: FC<LogOutProps> = ({ className = "" }) => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logOut());
  })
  return (
    <div>
      <Navigate to="/login"/>
    </div>
  )
  
};

export default LogOut;
