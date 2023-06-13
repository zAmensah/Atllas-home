import type { FC } from "react";
import { IAgent } from "../../types/Agent";

import "./Agent.css";

const Agent: FC<{ agent: IAgent }> = ({ agent }) => {
  const practiceAreaArray = agent.practiceAreas.split(",");

  return (
    <div className="container">
      <div className="avatar-holder">
        <img className="round" src={agent.photoUrl} alt={agent.firstName} />
      </div>
      <h3>
        {agent.firstName} {agent.lastName}
      </h3>
      <h5>{agent.address}</h5>
      <p className="user-description">{agent.aboutMe}</p>
      {agent.practiceAreas && agent.practiceAreas.length > 0 && (
        <div className="skills">
          <h5>Practice Areas</h5>
          <ul>
            {practiceAreaArray.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>

    // <div className="container">
    //   <header>
    //     <div className="avatar-holder">
    //       <img src={agent.photoUrl} className="avatar" alt={agent.firstName} />
    //     </div>
    //     <h2 className="agent-name">{agent.firstName + " " + agent.lastName}</h2>
    //   </header>
    //   <div className="body">{agent.aboutMe}</div>
    //   <footer>
    //     <div className="full-width-flex-box">
    //       <div className="one-third-flex-box">
    //         <span>{agent.address}</span>
    //       </div>
    //       <div className="one-third-flex-box">
    //         <span>Areas of Practice: {agent.practiceAreas}</span>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
  );
};

export default Agent;
