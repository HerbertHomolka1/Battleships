function login(username, password) {

    let URL = "http://127.0.0.1:5000/login";
    const payload = { username: username, password: password };
    const accessToken = fetch(URL, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((apiRes) => {
        if (apiRes.ok) {
          return apiRes.json();
        } else {
          throw new Error(`fetch failed. ${apiRes.status}`);
        }
      })
      .then((resJson) => {
        const accessToken = resJson.access_token;
        const refreshToken = resJson.refreshToken;
        return accessToken;
      })
      .catch((err) => console.log(err));
  
      return accessToken;
  }
  
  
  export default login;
  