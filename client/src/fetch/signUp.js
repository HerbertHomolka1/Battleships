function signUp(username, password) {
  let URL = "http://127.0.0.1:5000/signup";
  const payload = { username: username, password: password };
  const message = fetch(URL, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((apiRes) => apiRes.json())
    .then((resJson) => resJson.message
    )
    .catch((err) => console.log(err));

    return message;
}


export default signUp;
