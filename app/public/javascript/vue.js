console.log("Hi from public JS");



function deDisable(x_id, btn_lk, btn_up) {
  let x = document.getElementById(x_id);
  let btnLk = document.getElementById(btn_lk);
  let btnUp = document.getElementById(btn_up);

  if (x.hasAttribute("disabled")) {
      btnLk.removeAttribute('disabled');
      btnUp.removeAttribute('disabled');
    }
    x.removeAttribute('disabled');
    btnLk.setAttribute('disabled', true);
}
