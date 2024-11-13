let $ = document;
let name_input = $.querySelector(".name-input");
let email_input = $.querySelector(".email-input");
let phone_input = $.querySelector(".phone-input");
let img_input = $.querySelector(".img-input");
let sendBtn = $.querySelector("#send");
let statusCode = 0;

async function update_infoUser(id) {
    if (validationInfo()) {
        console.log({
            id,
            name: name_input.value,
        });

        // console.log(formData);
        const response = await fetch("http://localhost/user/info/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name_input.value,
                phone: phone_input.value,
            }),
        });

        let statusCode = response.status;
        const result = await response.json();
        console.log(result);

        alert(result.data);

        if (statusCode === 200) {
            window.location.replace("http://localhost/");
        }
    }
}

async function update_profUser(id) {
    if (!img_input.files.length > 0) return alert("یک عکس انتخاب کن .");

    console.log({
        img: img_input.files[0],
    });

    let formData = new FormData();
    formData.append("img", img_input.files[0]);

    console.log(formData);
    const response = await fetch("http://localhost/user/prof/" + id, {
        method: "PUT",
        body: formData,
    });

    let statusCode = response.status;
    const result = await response.json();
    console.log(result);

    alert(result.data);

    if (statusCode === 200) {
        return window.location.replace("http://localhost/user/me");
    }
}

function validationInfo() {
    if (name_input.value.trim().length > 0 || email_input.value.trim().length > 0) return true;

    return false;
}
