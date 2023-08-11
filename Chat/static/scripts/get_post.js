// Получаем токен
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie("csrftoken");

// Получаем данные с сервера
async function getApiData(callback, url) {
  if (arguments.length > 1) {
    fetch(url).then((response) => {
      return callback(response.json())
    })
    } else {
    const response = await fetch(callback)
    return response.json()
    }
  }

// Отправляем данные на сервер
function putApiData(data, url) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": csrftoken,
    },
    body: JSON.stringify(data)
  })
}

function updateApiData(data, url) {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-CSRFTOKEN": csrftoken,
    },
    body: JSON.stringify(data)
  })
}

export {getApiData, putApiData, updateApiData}