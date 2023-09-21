
function login(email, password) {
  return fetch("http://localhost:3030/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const token  = data.access_token
      const id = data.user.id
      const user = data.user.name
      return {token , user, id};
    });
}

export { login };
