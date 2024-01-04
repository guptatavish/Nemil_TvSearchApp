//  https://api.tvmaze.com/search/shows?q=girls
const form = document.querySelector('#searchForm')
const catalog = document.querySelector('.catalog')
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    form.elements.query.value = ''
    deletecard();
    makeImages(res.data);
    const padding = document.querySelectorAll(".card")
    for (let img of padding) {
        img.style.padding = '10px'
    }
    const radius = document.querySelectorAll("img")
    for (let img of radius) {
        img.style.borderRadius = '25px'
    }

})
function deletecard() {
    let cards = document.querySelectorAll('.card')
    for (let card of cards) {
        card.remove();
        // remove() works only on one element at a time hence gotta loop over all the images
    }
}

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('card');
            newDiv.style.display = 'inline-block';
            newDiv.style.textAlign = 'center';
            const newIMG = document.createElement('img');
            newIMG.src = result.show.image.medium;
            const nameOfMovie = document.createElement('p')
            nameOfMovie.innerText = `${result.show.name}`;
            newDiv.append(newIMG);
            newDiv.append(nameOfMovie);
            catalog.append(newDiv);
        }
    }
}