const HOST = "http://127.0.0.1:3000";

const urls = {
  ROOMS: `${HOST}/room/`,
  USERS: `${HOST}/users/`,
  MESSAGES: `${HOST}/message/`,
  CURRENT: `${HOST}/current_user/`,
  MESSAGE: `${HOST}/message/?target=`,
  MEMBER: `${HOST}/members/`,
};

const nodes = {
  rooms: document.querySelector(".rooms"),
  users: document.querySelector(".users"),
  message: document.querySelector(".messages"),
};

export { urls, nodes };
