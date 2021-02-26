if (localStorage.getItem("topCollapsed") === "true") {
  let a = document.querySelector(".header__container");
  a.classList.add("collapsed");

  let p = document.querySelector(".header__top");
  p.classList.add(`release`);

  let o = ["", "one", "two"];
  let r = Math.floor(Math.random() * (3 - 0)) + 0;
  p.classList.add(`${o[r]}`);
}