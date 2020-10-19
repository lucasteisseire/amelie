export const validateSignInInput = (firstName, lastName, email, password) => {
  const errors = {};

  if (firstName.trim() === "") {
    errors.firstname = "Firstname must not be empty";
  }
  if (lastName.trim() === "") {
    errors.lastName = "Lastname must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password cant be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateSignUpInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }
  if (password === "") {
    errors.password = "Password cant be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateTeam = (team) => {
  let SQUAD_LEADER = 0;
  let SQUAD_MEMBER = 0;
  let STAGIAIRE = 0;
  if (team.users) {
    for (let i = 0; i < team.users.length; i++) {
      team.users[i].userRole === "SQUAD_LEADER" && (SQUAD_LEADER += 1);
      team.users[i].userRole === "SQUAD_MEMBER" && (SQUAD_MEMBER += 1);
      team.users[i].userRole === "STAGIAIRE" && (STAGIAIRE += 1);
    }
    if (SQUAD_LEADER > 1) {
      throw new Error("Your team already have a leader");
    }
    if (SQUAD_MEMBER > 2) {
      throw new Error("Your team already have two members");
    }
    if (STAGIAIRE > 1) {
      throw new Error("Your team already have a stagiaire");
    }
  }
  return true;
};
export const validateRole = (newRole, currentRole) => {
  if (currentRole === newRole) return true;
  if (currentRole === "STAGIAIRE" && newRole !== "SQUAD_MEMBER") {
    throw new Error("you can only become a member");
  }
  if (
    (currentRole === "SQUAD_MEMBER" && newRole == !"SQUAD_LEADER") ||
    newRole == !"STAGIAIRE"
  ) {
    throw new Error("you can only become a leader or stagiaire");
  }
  if (currentRole === "SQUAD_LEADER" && newRole == !"SQUAD_MEMBER") {
    throw new Error("you can only become a member");
  }
  return false;
};
export const validateNewRoleInTeam = (team, newRole) => {
  let SQUAD_LEADER = 0;
  let SQUAD_MEMBER = 0;
  let STAGIAIRE = 0;
  if (team.users) {
    for (let i = 0; i < team.users.length; i++) {
      team.users[i].userRole === "SQUAD_LEADER" && (SQUAD_LEADER += 1);
      team.users[i].userRole === "SQUAD_MEMBER" && (SQUAD_MEMBER += 1);
      team.users[i].userRole === "STAGIAIRE" && (STAGIAIRE += 1);
    }
    if (
      SQUAD_LEADER > 1 ||
      (SQUAD_LEADER === 1 && newRole === "SQUAD_LEADER")
    ) {
      throw new Error("Your team already have a leader");
    }
    if (
      SQUAD_MEMBER > 2 ||
      (SQUAD_MEMBER === 2 && newRole === "SQUAD_MEMBER")
    ) {
      throw new Error("Your team already have two members");
    }
    if (STAGIAIRE > 1 || (STAGIAIRE === 1 && newRole === "STAGIAIRE")) {
      throw new Error("Your team already have a stagiaire");
    }
  }
  return true;
};
