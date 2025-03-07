document.getElementById("signupBtn").addEventListener("click", async () => {
  const nickname = document.getElementById("nickname").value;
  const email = document.getElementById("email").value;
  const pwd = document.getElementById("pwd").value;
  const body = { nickname, email, pwd };
  const data = await axios
    .post("/member", {
      ...body,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);

  if (data.message === "ok") {
    console.log("ok");
    const modal = bootstrap.Modal.getInstance(document.getElementById("signupModal"));

    modal.hide();
    document.getElementById("signupLi").remove();
  } else {
    console.error(data.message);
    alert("Email or nickname is already in use.");
  }
});
