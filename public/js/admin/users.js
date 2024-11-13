let $ = document;
let name_input = $.querySelector("#addForm #name-input");
let password_input = $.querySelector("#addForm #password-input");
let repetitive_password_input = $.querySelector("#addForm #repetitive-password-input");
let email_input = $.querySelector("#addForm #email-input");
let phone_input = $.querySelector("#addForm #phone-input");
let statusCode = 0;

async function usermDelete(id, userName) {
    const confirmation = confirm(`آیا مطمئن هستید که می‌خواهید کاربر ${userName} را حذف کنید؟`);
    if (confirmation) {
        const response = await fetch(`http://localhost/user/${id}`, {
            method: "DELETE",
        });

        statusCode = response.status;
        const result = await response.json();

        alert(result.data);

        if (statusCode === 200) {
            setInterval(() => {
                location.reload();
            }, 500);
        }
    }
}

function editUser(id, name, phone) {
    $.querySelector("#editForm #name-input").value = name;
    $.querySelector("#editForm #phone-input").value = phone;
    $.querySelector("#editModal").dataset.id = id;
}

// add user
$.querySelector("#addForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = name_input.value;
    const email = email_input.value;
    const password = password_input.value;
    const passwordRepetitive = repetitive_password_input.value;
    const phone = phone_input.value;

    const response = await fetch("http://localhost/user/add", {
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
        }),
    });

    let statusCode = response.status;
    const result = await response.json();
    console.log("code :", statusCode + "data :" + result);

    alert(result.data);

    if (statusCode === 200) {
        window.location.reload();
    }
});

//edit user
$.querySelector("#editModal ").addEventListener("submit", async function (event) {
    event.preventDefault();

    const usetId = $.querySelector("#editModal").dataset.id;
    const name = $.querySelector("#editForm #name-input").value;
    const phone = $.querySelector("#editForm #phone-input").value;
    console.log(usetId, name, email, phone);
    const response = await fetch(`http://localhost/user/info/${usetId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
        }),
    });

    let statusCode = response.status;
    const result = await response.json();
    console.log("code :", statusCode + "data :" + result);

    alert(result.data);

    if (statusCode === 200) {
        window.location.reload();
    }
});

// edit profile image user
$.querySelector("#editImgModal").addEventListener("submit", async function (event) {
    event.preventDefault();

    const usetId = $.querySelector("#editModal").dataset.id;
    const img = $.querySelector("#editImgModal #categoryImage").files[0];

    console.log({ usetId, img });

    const formData = new FormData();
    if (!img) {
        return alert(" یک عکس اپلود کن  ");
    }

    formData.append("img", img); // نام فیلد باید با `uploadCategory.single('img')` مطابقت داشته باشد
    const responseImg = await fetch(`http://localhost/user/prof/${usetId}`, {
        method: "PUT",
        body: formData,
    });

    let statusCode = responseImg.status;
    const result = await responseImg.json();
    console.log("code :", statusCode + "data :" + result);

    alert(result.data);

    if (statusCode === 200) {
        return window.location.reload();
    }
});

//edit Password User
$.querySelector("#editModalPassword").addEventListener("submit", async function (event) {
    event.preventDefault();

    const usetId = $.querySelector("#editModal").dataset.id;
    const password = $.querySelector("#editModalPassword #password-input").value;

    console.log(usetId, password);

    const response = await fetch(`http://localhost/user/password/${usetId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: password,
        }),
    });

    let statusCode = response.status;
    const result = await response.json();
    console.log("code :", statusCode + "data :" + result);

    alert(result.data);

    if (statusCode === 200) {
        window.location.reload();
    }
});
