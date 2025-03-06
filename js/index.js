import axios from "./axios.js";

window.onload = async () => {
  const email = sessionStorage.getItem("email");
  if (email) {
    document.getElementById("loginSpan").innerHTML = email.split("@")[0] + ` <button id="logoutBtn">Logout</button>`;
  }

  const productList = await axios.get("/products").then((res) => res.data);

  let productListDiv = "";
  productList.forEach((item) => {
    productListDiv += `<div class="card m-3" style="width: 10rem;">
                <img src="img/${item.prodImg}" class="card-img-top" alt=${item.prodName}>
                <div class="card-body">
                  <b class="card-title">${item.prodName}</b>
                  <p class="card-text text-danger">${item.price.toLocaleString()}원</p>
                  <a href="#" class="btn btn-outline-info addBtn" id="addBtn">장바구니 담기</a>
                </div>
              </div>`;
  });
  document.getElementById("productListDiv").innerHTML = productListDiv;

  document.querySelectorAll(".addBtn").forEach((btn) =>
    btn.addEventListener("click", async () => {
      const res = await axios.post("/cart");
      console.log(res);
    })
  );
};

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
    alert(data.msg);
  }
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const pwd = document.getElementById("loginPwd").value;
  const body = { nickname: "", email, pwd };
  const data = await axios
    .post("/login", {
      ...body,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);

  if (data.message === "ok") {
    alert("Login successfully.");

    document.getElementById("loginSpan").innerHTML = email.split("@")[0] + ` <button id="logoutBtn">Logout</button>`;
    sessionStorage.setItem("email", email);
    const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
    modal.hide();
  } else {
    alert("[Login fail] Please login again.");
  }
});

document.getElementById("loginSpan").addEventListener("click", (e) => {
  if (e.target.id === "logoutBtn") {
    sessionStorage.removeItem("email");
    window.location.reload();
  }
});
