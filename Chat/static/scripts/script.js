fetch("/api/room")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch(() => {
    console.log("error");
  });
