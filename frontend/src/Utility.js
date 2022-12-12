function _fetch(url) {
  return fetch(url).then((response) => {
    console.log("test");
    // console.log(response.json());
    return response.json();
  });
}

function redirectIfSignedOut(navigate) {
  const token = localStorage.getItem("token");
  const pathname = window.location.pathname;

  if (
    (token === "" || !token) &&
    (pathname != "/signup" || pathname != "/signin")
  ) {
    alert(token);
    navigate("/signup");
  }
}

export { redirectIfSignedOut, _fetch };
