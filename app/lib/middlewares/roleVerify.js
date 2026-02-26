const roleVerify = (roles = [], user) => {
  if (roles.find((role) => role === user.role)) {
    return { verify: true };
  } else {
    return { verify: false };
  }
};

export default roleVerify;
