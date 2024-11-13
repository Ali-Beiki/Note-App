let $ = document;
let name_input = $.querySelector(".name-input");
let password_input = $.querySelector(".password-input");
let repetitive_password_input = $.querySelector(".repetitive-password-input");
let email_input = $.querySelector(".email-input");
let phone_input = $.querySelector(".phone-input");

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const token = grecaptcha.getResponse();

    if (!token) {
        alert(" تیک امنیتی را بزنید ");
        grecaptcha.reset();
        return;
    }

    const name = name_input.value;
    const email = email_input.value;
    const password = password_input.value;
    const passwordRepetitive = repetitive_password_input.value;
    const phone = phone_input.value;

    const response = await fetch("http://localhost/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            passwordRepetitive: passwordRepetitive,
            phone: phone,
            "g-recaptcha-response": token, // send recaptcha googel
        }),
    });

    let statusCode = response.status;
    const result = await response.json();
    console.log("code :", statusCode + "data :" + result);

    alert(result.data);
    grecaptcha.reset();
    if (statusCode === 200) {
        window.location.reload();
    }
});
