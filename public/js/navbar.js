let btn_menu = document.querySelector("#nav-menu");

btn_menu.addEventListener("change", () => {
  let nav_menu = document.querySelector(".nav-togle-menu");
  if (btn_menu.checked) {
    nav_menu.style.left = "0";
  } else {
    nav_menu.style.left = "-500px";
  }
});

let btn_user = document.querySelector("#u-options");

btn_user.addEventListener("change", () => {
  let togle_user = document.querySelector(".togle-user");
  if (btn_user.checked) {
    togle_user.style.right = "0";
  } else {
    togle_user.style.right = "-500px";
  }
});


let btn_fa=document.querySelector(".flash-alert img");
btn_fa.addEventListener("click", ()=>{
  let div_flash=document.querySelector(".flash-alert");
  div_flash.style.display="none";
})