import React from "react";
import "./UsersInfo.css";

function UsersInfo() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Public Blogs</th>
            <th>Private Blogs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-column="Name" className="user__info__name">
              Vishal
            </td>
            <td data-column="Email" className="user__info__email">
              Vishal.sony1@gmail.com
            </td>
            <td data-column="Public-Post" className="user__info__public__post">
              4
            </td>
            <td
              data-column="Private-Post"
              className="user__info__private__post">
              7
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UsersInfo;
