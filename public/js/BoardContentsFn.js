const topBtn = document.getElementById("top");
const navbar = document.getElementById("navbar");
topBtn.addEventListener("click", () => {
  navbar.scrollIntoView({ behavior: "smooth" });
});

const submit = document.getElementById("comment__register");
const text = document.querySelector(".comment__textarea");
submit.addEventListener("click", (event) => {
  if (text.value === "") {
    alert("내용이 없습니다.");
    event.preventDefault();
  }
});
