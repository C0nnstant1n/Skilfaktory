const urls = {
  ROOMS: "/api/room/",
  USERS: "/api/users/",
  MESSAGES: "/api/message/",
  CURRENT: "/api/current_user/",
  MESSAGE: "/api/message/?target=",
  MEMBER: "/api/members/",
};

const nodes = {
  rooms: document.querySelector(".rooms"),
  users: document.querySelector(".users"),
  message: document.querySelector(".messages"),
};

export { urls, nodes };
