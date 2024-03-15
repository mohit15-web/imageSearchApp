console.log("mohit");

const accessKey = "Et07xjQvZFvSbVQkPoYU-tNIow5r_JjmgbtNAw7pX40";

const inputText = document.getElementById("inputText");
const btn = document.getElementById("btn");
const imageContainer = document.getElementById("imageContainer");
const showBtn = document.getElementById("showBtn");

let inputData = "";
let page = 1;

async function fetchImage() {
  if (page === 1) {
    imageContainer.innerHTML = "";
  }

  inputData = inputText.value;
  console.log(inputData);

  const url = `https://api.unsplash.com/search/photos?query=${inputData}&client_id=${accessKey}&page=${page}`;
  let respons = await fetch(url);
  let data = await respons.json();

  const results = data.results;

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("w-[300px]", "flex","border-[#9fd3c7]","border-8");
    const image = document.createElement("img");
    image.classList.add("m-2");
    image.src = result.urls.small;

    image.addEventListener("click", () => {
      navigator.clipboard.writeText(result.urls.regular)
        .then(() => {
          console.log("Image URL copied to clipboard:", result.urls.regular);
          alert("Image URL copied to clipboard!");
        })
        .catch((error) => {
          console.error("Unable to copy image URL to clipboard:", error);
          alert("Failed to copy image URL to clipboard.");
        });
    });

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);

    imageContainer.appendChild(imageWrapper);
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
  });

  showBtn.style.display = data.total_pages > page ? "block" : "none";
}

btn.addEventListener("click", () => {
  page = 1;
  fetchImage();
});

showBtn.addEventListener("click", () => {
  page++;
  fetchImage();
});
