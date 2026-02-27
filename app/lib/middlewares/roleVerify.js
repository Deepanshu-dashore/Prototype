const roleVerify = (roles = [], user) => {
  return roles.some((role) => role.toLowerCase() === user?.role?.toLowerCase());
};

export default roleVerify;
