import React from "react";
import { useSelector, connect } from "react-redux";
import { useLocation } from "react-router-dom";
import css from "./MembersList.module.css";
import { updateMembers } from "../../redux/operations/membersOperations";
import projects from "../../redux/operations/projectsOperations";

const MemberList = ({ updateMembers, getProjects, email }) => {
  const location = useLocation();
  const projects = useSelector((state) => state.projects);
  const foundProject = projects.find((project) =>
    location.pathname.includes(project.id)
  );

  async function deleteMember({ target }) {
    const memberToDelete = target.dataset.email;
    if (memberToDelete !== email) {
      const newMembers = foundProject.members.filter(
        (member) => member !== memberToDelete
      );
      await updateMembers(newMembers, location.pathname.split("/")[2]);
      getProjects(email);
    } else return;
  }

  return (
    <>
      <p className={css.allMembersLength}>
        Всього участникiв у проектi -{" "}
        {foundProject ? foundProject.members.length : "0"}
      </p>
      <ul className={css.membersList}>
        {foundProject &&
          foundProject.members.map((email) => (
            <li key={email} className={css.membersItem}>
              <p>{email}</p>
              <button
                onClick={deleteMember}
                data-email={email}
                className={css.deleteButton}
              ></button>
            </li>
          ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => ({
  email: state.auth.email,
});

const mapDispatchToProps = {
  updateMembers,
  getProjects: projects.getProjectsByEmailOperationCustom,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
