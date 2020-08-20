import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import css from "./MembersList.module.css";

const MemberList = () => {
  const history = useHistory()
  const members = useSelector(state => state.projects)
  const findProject = members.find(member => history.location.pathname.includes(member.id));

  return (
    <>
      <p className={css.allMembersLength}>Всього участникiв у проектi - {findProject ? findProject.members.length : "0"}</p>
      <ul className={css.membersList}>
        {findProject && findProject.members.map(email => <li key={email} className={css.membersItem}>{email} <button className={css.deleteButton}>X</button></li>)}
      </ul>
    </>
  );
};

export default MemberList;