const inputs = document.querySelectorAll(".regForm--input");
const submit = document.querySelector(".regForm--submit");
const errs = document.querySelectorAll(".regForm--error");

const errorEmpty = "Это поле не может быть пустым";

const CHECK_NAME = /[^а-яА-Я]/;
const CHECK_EMAIL = /^[a-zA-Z0-9]+\@[a-zA-Z]+\.[a-zA-Z]+$/;
const CHECK_LETTER = /[a-z]/;
const CHECK_LETTER_BLOCK = /[A-Z]/;
const CHECK_NUMBERS = /[0-9]/;
const CHECK_SYMBOLS = /[^a-zA-Z0-9\s]/;
const CHECK_SPACE = /\s/;

function checkEmpty(input, i) {
  if (input.value === "") {
    errs[i].innerHTML = errorEmpty;
    return true;
  } else {
    return false;
  }
}

function checkName(input, i) {
  if (!CHECK_NAME.test(input.value)) {
    if (input.value.length >= 2) {
      errs[i].innerHTML = "";
      if (input.value.length >= 30) {
        errs[i].innerHTML = "Длина поля должна быть меньше тридцати букв";
      }
    } else {
      errs[i].innerHTML = "Длина поля должна быть больше одной буквы";
    }
  } else {
    errs[i].innerHTML = "Использованы некорректные символы";
  }
}

function checkEmail(input, i) {
  if (!CHECK_EMAIL.test(input.value)) {
    errs[i].innerHTML = "Электронная почта некорректно введена";
  } else {
    if (input.value.length >= 50) {
      errs[i].innerHTML = "Длина поля должна быть меньше пятидесяти букв";
    } else {
      errs[i].innerHTML = "";
    }
  }
}

function checkPass(pass, passMatch, i) {
  if (pass.value.length >= 8) {
    if (pass.value.length >= 30) {
      errs[i].innerHTML = "Длина поля должна быть меньше тридцати символов";
    } else {
      if (
        pass.value.match(CHECK_LETTER) &&
        pass.value.match(CHECK_LETTER_BLOCK) &&
        pass.value.match(CHECK_NUMBERS) &&
        pass.value.match(CHECK_SYMBOLS) &&
        !pass.value.match(CHECK_SPACE)
      ) {
        if (pass.value == passMatch.value) {
          errs[i].innerHTML = "";
          errs[i + 1].innerHTML = "";
        } else {
          errs[i + 1].innerHTML = 'Поле должно совпадать с полем "Пароль"';
        }
      } else {
        errs[i].innerHTML =
          "Пароль должен содержать минимум одну цифру, заглавную и строчную буквы и один символ";
      }
    }
  } else {
    errs[i].innerHTML = "Длина пароля должна быть больше восьми символов";
  }
}

function checkDateBirth(input, i) {
  let dateNow = new Date();
  let dateBirth = input.value.split("-");
  let difYear = dateNow.getFullYear() - Number(dateBirth[0]);
  let difMonth = dateNow.getMonth() + 1 - Number(dateBirth[1]);
  let difDay = dateNow.getDate() - Number(dateBirth[2]);

  if (difYear <= 18) {
    if (difYear == 18) {
      if (difMonth >= 0) {
        errs[i].innerHTML = "";
        if (difMonth == 0) {
          if (difDay >= 0) {
            errs[i].innerHTML = "";
          } else {
            errs[i].innerHTML =
              "Регистрация возможна только после достижения 18-тилетия";
          }
        }
      }
      else {
        errs[i].innerHTML =
          "Регистрация возможна только после достижения 18-тилетия";
      }
    }
    else {
      errs[i].innerHTML =
        "Регистрация возможна только после достижения 18-тилетия";
    }
  }
  else {
    errs[i].innerHTML = "";
  }
}

submit.addEventListener("click", () => {
  inputs.forEach((input, index) => {
    if (!checkEmpty(input, index)) {
      if (index === 0 || index === 1) {
        checkName(input, index);
      }
      if (index == 2) {
        checkEmail(input, index);
      }
      if (index == 3) {
        checkPass(inputs[3], inputs[4], index);
      }
      if (index == 5) {
        checkDateBirth(input, index);
      }
    }
  });
});
