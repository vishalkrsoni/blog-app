import React from "react";
import "./UsersInfo.css";

function UsersInfo({ usersList }) {
  return (
    <div className="users__info">
      {/* <div className="users__info__heading">Users List</div> */}
      <div className="users__table__container">
        <table className="users__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Public Blogs</th>
              <th>Private Blogs</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => {
              return (
                <>
                  <tr>
                    <td data-column="Name" className="user__info__name">
                      {user.name}
                    </td>
                    <td data-column="Email" className="user__info__email">
                      {user.email}
                    </td>
                    <td
                      data-column="Public-Post"
                      className="user__info__public__post">
                      {user.publicBlogs}
                    </td>
                    <td
                      data-column="Private-Post"
                      className="user__info__private__post">
                      {user.privateBlogs}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersInfo;
