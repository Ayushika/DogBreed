/** @format */

var index = 0;
var data;
const ul = document.createElement("ul");
const container = document.getElementsByClassName("container-fluid")[0];
const select = document.getElementById("dropdown");
let breed = [];
var dogBreedData = null;
ul.className = "row";
container.appendChild(ul);

window.addEventListener("load", () => {
  var request = new XMLHttpRequest();
  request.onload = function () {
    var response = JSON.parse(request.response);
    data = response;
    response.forEach((element) => {
      if (
        !breed.includes(element.breed_group) &&
        element.breed_group !== undefined &&
        element.breed_group !== null &&
        element.breed_group.length != 0
      ) {
        breed.push(element.breed_group);
        const option = document.createElement("option");
        const textNode = document.createTextNode(element.breed_group);
        option.appendChild(textNode);
        select.appendChild(option);
      }
    });
    addDogImage();
  };
  request.open("get", "https://api.thedogapi.com/v1/breeds", true);
  request.send();
});

const changeTextColor = (breed, textNode) => {
  switch (breed) {
    case "Toy":
      textNode.style.color = "black";
      break;
    case "Hound":
      textNode.style.color = "black";
      break;
    case "Terrier":
      textNode.style.color = "black";
      break;
    case "Working":
      textNode.style.color = "black";
      break;
    case "Mixed":
      textNode.style.color = "black";
      break;
    case "Sporting":
      textNode.style.color = "black";
      break;
    case "Non-Sporting":
      textNode.style.color = "black";
      break;
    case "Herding":
      textNode.style.color = "black";
      break;
    default:
      textNode.style.color = "black";
      break;
  }
};

select.addEventListener("change", (e) => {
  var option = e.target.value;
  index = 0;
  ul.innerHTML = "";
  if (option == "Select All") {
    addDogImage();
  } else {
    dogBreedData = data.filter((dog) => dog.breed_group == option);
    addDogBreedImage();
    if (document.querySelector(".load") !== null)
      container.removeChild(document.querySelector(".load"));
  }
});

const addDogImage = () => {
  for (var i = index; i < index + 10; i++) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    let image = document.createElement("img");
    image.src = data[i].image.url;
    image.className = "dog-image";
    let text = document.createTextNode(data[i].name);
    div.appendChild(image);
    div.appendChild(text);
    div.className = "dog-item";
    li.appendChild(div);
    li.className = "col-12 col-sm-6 col-md-4 li-element";
    changeTextColor(data[i].breed_group, li);
    ul.appendChild(li);
  }

  if (index == 0) {
    const button = document.createElement("button");
    const text = document.createTextNode("Show More");
    button.appendChild(text);
    button.onclick = addDogImage;
    button.className = "load";
    container.appendChild(button);
  }
  index = index + 10;
};

const addDogBreedImage = () => {
  for (var i = 0; i < dogBreedData.length; i++) {
    const listItem = document.createElement("li");
    const div = document.createElement("div");
    let image = document.createElement("img");
    image.src = dogBreedData[i].image.url;
    image.className = "dog-image";
    const text = document.createTextNode(dogBreedData[i].name);
    div.appendChild(image);
    div.appendChild(text);
    div.className = "dog-item";
    listItem.appendChild(div);
    listItem.className = "col-12 col-sm-6 col-md-4 li-element";
    ul.appendChild(listItem);
  }
};
