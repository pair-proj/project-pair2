var people = [
  { name: "abdelmajid", img: "./img/pics/abdelmajid.png" },
  { name: "yesser", img: "./img/pics/yesser.png" },
  { name: "aymen", img: "./img/pics/aymen.png" },
  { name: "chaker", img: "./img/pics/chaker.png" },
  { name: "charfeddine", img: "./img/pics/charfeddine.png" },
  { name: "dhekra", img: "./img/pics/dhekra.png" },
  { name: "eya", img: "./img/pics/eya.png" },
  { name: "hamza", img: "./img/pics/hamza.png" },
  { name: "houssem", img: "./img/pics/houssem.png" },
  { name: "iheb", img: "./img/pics/iheb.png" },
  { name: "rtimi", img: "./img/pics/rtimi.png" },
  { name: "fedi", img: "./img/pics/fedi.png" },
];

function renderNames() {
  var container = document.getElementById("name-list");
  people.forEach((person) => {
    var nameDiv = document.createElement("div");
    nameDiv.className = "name-item";
    nameDiv.textContent = person.name;
    nameDiv.dataset.img = person.img;
    nameDiv.addEventListener("click", function () {
      localStorage.setItem("selectedImage", person.img);
      window.location.href = "index2.html";
    });
    container.appendChild(nameDiv);
  });
}

document.addEventListener("DOMContentLoaded", renderNames);
