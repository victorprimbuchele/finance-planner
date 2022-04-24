import React from "react";
import { Link } from "react-router-dom";
import { IProfileButtonParams } from "./profile-button-types";

export const ProfileButton: React.FC<IProfileButtonParams> = ({
  user,
}: IProfileButtonParams) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-2/4 max-w-full`}
    >
      <Link
        to="/profile"
        className="rounded-full w-14 h-10  bg-cyan-600 max-w-fit p-4  bg-[url(https://www.facebook.com/images/fb_icon_325x325.png)] bg-cover bg-center"
      />
      <hr className="w-full my-2" />
      <div className="font-semibold">
        <span>{user.name}</span>
      </div>
    </div>
  );
};
