let photos = [];
let page = 0; //aqui se guarda el  valor de la pagina a representar
let elemntPorpage = 10; //determina la cantidad de elementos a mostrar
const getPhotos = () => {
  fetch("https://jsonplaceholder.typicode.com/photos/")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error("resource not found");
      }
    })
    .then((response) => {
      photos = response;
      renderPhotos();
    })
    .catch((err) => console.log(err, "resource could not be loaded"));
};

function renderPhotos() {
  let pageIndex = 0;

  pageIndex = page * elemntPorpage; //determina el index del primer elemento dende empieza la pagina
  const pageLabel = document.querySelector("#page-label");
  pageLabel.textContent = page + 1;

  const photosContainer = document.querySelector(".albums-container");

  let photosCurrentPage = photos.filter(
    (photo) => photo.id >= pageIndex && photo.id <= pageIndex + elemntPorpage
  );
  //   console.log(photosCurrentPage);

  const html = photosCurrentPage.map((photo) => {
    // console.log(photo.id);
    return `<div class="album" data-id=${photo.id}>
                <img  src=${photo.thumbnailUrl} alt="Thumb.Ur">
                <div class="details">
                    <span class="album-title">Title:${photo.title}</span>
                    <span class="album-id">Id:${photo.id}</span>
                </div>
            </div>`;
  });

  photosContainer.innerHTML = html.join("");
}

getPhotos();
//pontando  la pagina

const pageLabel = document.querySelector("#page-label");
pageLabel.textContent = page + 1;

//anadiendo eventos a actions
const bPrev = document.querySelector(".btn-prev");
const bNext = document.querySelector(".btn-next");

bPrev.addEventListener("click", (e) => {
  if (page > 0) {
    page--;
    renderPhotos();
  }
});

bNext.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  renderPhotos();
});
