// nome - localStorage
const saveBtn = document.querySelectorAll(".save button");
const nameInput = document.querySelector('input[type="text"]');
let nameChanged = false;

const setName = () => {
  if (localStorage.getItem("name") === null) {
    return nameInput.value;
  } else {
    return localStorage.getItem("name");
  }
};

const initialName = setName();
nameInput.value = initialName;
console.log(initialName);

nameInput.addEventListener("change", (event) => {
  nameChanged = nameInput.value === initialName ? false : true;
  console.log(nameChanged);
});

// immagine
const profilePicDiv = document.querySelector(".profile-img");
const profilePic = profilePicDiv.querySelector("img");
let imgToSave = undefined;
if (localStorage.getItem("profile-pic") !== null) {
  profilePic.src = localStorage.getItem("profile-pic");
}

profilePicDiv.addEventListener("click", () => {
  // .... modifica immagine
  let imgName;
  console.log("modificata");
  let input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (_this) => {
    let files = Array.from(input.files);
    console.log(files);
    imgName = files[0].name;
    console.log(imgName, files[0].type, files[0].size);
    const reader = new FileReader();

    reader.readAsDataURL(files[0]); // read file as data url

    reader.onload = (event2) => {
      // called once readAsDataURL is completed
      if (event2.target == null) return;
      if (event2.target.result == null) return;
      profilePic.src = event2.target.result;
      console.log("fatto", event2.target.result);
      imgToSave = event2.target.result;
    };
  };
  input.click();
});

// salva immagine, nome e impostazioni
saveBtn[0].addEventListener("click", () => {
  if (nameChanged) {
    localStorage.setItem("name", nameInput.value);
  }
  if (imgToSave !== undefined) {
    localStorage.setItem("profile-pic", imgToSave);
  }
});

saveBtn[2].addEventListener("click", () => {
  localStorage.clear();
});
