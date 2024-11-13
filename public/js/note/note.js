let $ = document;
const addBox = $.querySelector(".add-box");
const popUpBox = $.querySelector(".popup-box");
const closeIcon = $.querySelector("header i");
const titleTag = $.querySelector("input");
const descTag = $.querySelector("textarea");
const addBtn = popUpBox.querySelector("button");
const popupTitle = $.querySelector("header p");
const errorBox = $.querySelector(".error-box");
let noteId = "";

let isUpdate = false;
let statusCode = 0;

addBox.addEventListener("click", function () {
    titleTag.focus();
    popUpBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    popUpBox.classList.remove("show");
});

addBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let noteTitle = titleTag.value,
        noteDesc = descTag.value;

    try {
        if (!isUpdate) {
            let result = await fetch("http://localhost/note/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: noteTitle,
                    content: noteDesc,
                }),
                // date: new Intl.DateTimeFormat("fa-IR").format(new Date()).toString(), // persian date
            });

            closeIcon.click();
            if (result.status == 200) {
                location.reload();
            }
        } else {
            let result = await fetch(`http://localhost/note/${noteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: noteTitle,
                    content: noteDesc,
                }),
            });
            console.log(result.data);
            closeIcon.click();

            if (result.status == 200) {
                location.reload();
            }

            noteId = "";
            return (isUpdate = false);
        }
    } catch (error) {
        console.error(`Error{location :note.js ,line ${error.stack} } data ${err}`);
    }
});

function showNotes(notes) {
    notes.forEach((note) => {
        let liTag = `  <li class="note">
      <div class="details">
          <p>${note.titel}</p>
          <span>${note.text}</span>
      </div>
      <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
               <li onclick="updateNote('${note._id}', '${note.titel}', '${note.text}')"><i class="uil uil-pen"></i>  ویرایش </li>
                <li onclick="deleteNote('${note._id}')"><i class="uil uil-trash"></i> حذف </li>
            </ul>
        </div>
      </div>
     </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

closeIcon.addEventListener("click", () => {
    titleTag.value = "";
    descTag.value = "";
});

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    $.addEventListener("click", (e) => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

async function deleteNote(noteId) {
    let confirmDel = confirm(" یادداشت حذف شود ؟ ");
    if (!confirmDel) return;

    let result = await fetch(`http://localhost/note/${noteId}`, {
        method: "DELETE",
    });

    closeIcon.click();
    if (result.status == 200) {
        location.reload();
    }
}

function updateNote(id, titel, text) {
    isUpdate = true;
    addBox.click();
    titleTag.value = titel;
    descTag.value = text;
    noteId = id;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}
