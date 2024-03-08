
const photoGalleryTable = document.querySelector('.photo-gallery__list');
const quantity = document.querySelector('#quantity');

let number = 1;


const acessKeyIm = "suEAGM9zeZbL2lSP4bf5i6mrgpmlFt1XwZtMxxeq_U8";

quantity.addEventListener("change", () => {
    loadMorePhotos(quantity.value);
});

async function fetchPhotos(numberPage, quantity) {
    try {
        const response = await fetch(`https://api.unsplash.com/photos?page=${numberPage}&per_page=${quantity}&client_id=${acessKeyIm}&lang=ru`);
        const photos = await response.json();
        return photos;
    } catch (error) {
        console.error('Ошибка при загрузке фотографий:', error);
        return [];
    }
}

function countUp(btn) {
    const countElement = btn.closest('.photo-gallery__item').querySelector('.count');
    const likedAttr = btn.getAttribute('data-liked');

    if (likedAttr !== 'true') {
        countElement.textContent = parseInt(countElement.textContent) + 1;
        btn.setAttribute('data-liked', 'true');
    }
}


function countDown(btn) {
    const countElement = btn.closest('.photo-gallery__item').querySelector('.count');
    const likedAttr = btn.getAttribute('data-liked');

    if (likedAttr !== 'false') {
        countElement.textContent = parseInt(countElement.textContent) - 1;
        btn.setAttribute('data-liked', 'false');
    }
}

async function loadMorePhotos(quantityPhoto) {
    fetchPhotos(number, quantityPhoto).then((photos) => {
        photos.forEach(photo => {
            photoGalleryTable.innerHTML += `
        <div class="photo-gallery__item">
            <div class="photo-gallery__item-wrap">
                <img class="photo-gallery__item-img" src="${photo.urls.small}">
            </div>
            <div class="photo-gallery__item-info">
                <p class="photo-gallery__name-photographer">Фотограф: ${photo.user.name}</p>
                <div class="like">
                    <button id="up" class="fa fa-thumbs-up">Like</button> 
                    <button id="down" class="fa fa-thumbs-down">unLike</button> 
                </div>
                <div class="count">0</div>
            </div>
        </div>
    `;
        });
        const likeBtn = photoGalleryTable.querySelectorAll('#up');
        const dislikeBtn = photoGalleryTable.querySelectorAll('#down');

        likeBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                countUp(btn);
            });
        });
        dislikeBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                countDown(btn);
            });
        });
    });
    number++;
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMorePhotos(quantity.value);
    }
});

loadMorePhotos(quantity.value);