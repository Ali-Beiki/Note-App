let $ = document;
let statusCode = 0;
let password_input = $.querySelector(".password-input");
let email_input = $.querySelector(".email-input");

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const token = grecaptcha.getResponse();

    if (!token) {
        alert(" تیک امنیتی را بزنید ");
        grecaptcha.reset();
        return;
    }

    const email = email_input.value;
    const password = password_input.value;

    const response = await fetch("http://localhost/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            "g-recaptcha-response": token,
        }),
    });

    let statusCode = response.status;
    const result = await response.json();
    console.log(result);

    alert(result.data);
    grecaptcha.reset();

    if (statusCode === 200) {
        window.location.replace("http://localhost/");
    }
});
