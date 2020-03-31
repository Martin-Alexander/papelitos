const join = document.querySelector(".join-button");
const form = document.querySelector(".join-form");

if (form) {
  join.addEventListener("click", (event) => {
    form.classList.remove("hide-form");
  });
}



