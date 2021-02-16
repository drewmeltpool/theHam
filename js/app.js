const masonryImg = [
    { url: "./img/gallery/gallery1.jpg" },
    { url: "./img/gallery/gallery2.jpg" },
    { url: "./img/gallery/gallery3.jpg" },
    { url: "./img/gallery/gallery4.jpg" },
    { url: "./img/gallery/gallery5.jpg" },
    { url: "./img/gallery/gallery6.jpg" },
    { url: "./img/gallery/gallery7.jpg" },
    { url: "./img/gallery/gallery8.jpg" },
    { url: "./img/gallery/gallery9.jpg" },
    { url: "./img/gallery/gallery10.jpg" },
    { url: "./img/gallery/gallery11.jpg" },
    { url: "./img/gallery/gallery12.jpg" },
    { url: "./img/gallery/gallery13.jpg" },
    { url: "./img/gallery/gallery14.jpg" },
    { url: "./img/gallery/gallery15.jpg" },
    { url: "./img/gallery/gallery16.jpg" },
    { url: "./img/gallery/gallery17.jpg" },
    { url: "./img/gallery/gallery18.jpg" },
    { url: "./img/gallery/gallery19.jpg" },
    { url: "./img/gallery/gallery20.jpg" },
    { url: "./img/gallery/gallery21.jpg" },
    { url: "./img/gallery/gallery22.jpg" },
]

const worksImg = [{
    url: "./img/graphicDesign/graphic-design1.jpg",
    type: "graphic-design",
}, {
    url: "./img/graphicDesign/graphic-design2.jpg",
    type: "graphic-design",
}, {
    url: "./img/graphicDesign/graphic-design3.jpg",
    type: "graphic-design",
}, {
    url: "./img/graphicDesign/graphic-design4.jpg",
    type: "graphic-design",
}, {
    url: "./img/graphicDesign/graphic-design5.jpg",
    type: "graphic-design",
}, {
    url: "./img/landingPage/landing-page1.jpg",
    type: "landing-page",
}, {
    url: "./img/landingPage/landing-page2.jpg",
    type: "landing-page",
}, {
    url: "./img/landingPage/landing-page3.jpg",
    type: "landing-page",
}, {
    url: "./img/landingPage/landing-page4.jpg",
    type: "landing-page",
}, {
    url: "./img/landingPage/landing-page5.jpg",
    type: "landing-page",
}, {
    url: "./img/landingPage/landing-page6.jpg",
    type: "landing-page",
}, {
    url: "./img/landingPage/landing-page7.jpg",
    type: "landing-page",
}, {
    url: "./img/webDesign/web-design1.jpg",
    type: "web-design",
}, {
    url: "./img/webDesign/web-design2.jpg",
    type: "web-design",
}, {
    url: "./img/webDesign/web-design3.jpg",
    type: "web-design",
}, {
    url: "./img/webDesign/web-design4.jpg",
    type: "web-design",
}, {
    url: "./img/webDesign/web-design5.jpg",
    type: "web-design",
}, {
    url: "./img/webDesign/web-design6.jpg",
    type: "web-design",
}, {
    url: "./img/webDesign/web-design7.jpg",
    type: "web-design",
}, {
    url: "./img/wordpress/wordpress1.jpg",
    type: "wordpress",
}, {
    url: "./img/wordpress/wordpress2.jpg",
    type: "wordpress",
}, {
    url: "./img/wordpress/wordpress3.jpg",
    type: "wordpress",
}, {
    url: "./img/wordpress/wordpress4.jpg",
    type: "wordpress",
}, {
    url: "./img/wordpress/wordpress5.jpg",
    type: "wordpress",
}, {
    url: "./img/wordpress/wordpress6.jpg",
    type: "wordpress",
}, {
    url: "./img/wordpress/wordpress7.jpg",
    type: "wordpress",
}, {
    url: "./img/wordpress/wordpress8.jpg",
    type: "wordpress",
}, {
    url: "./img/wordpress/wordpress9.jpg",
    type: "wordpress",
}, {
    url: "./img/wordpress/wordpress10.jpg",
    type: "wordpress",
}, ]

const loaderStr = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`


const firstActive = (arr, className) => arr.findIndex(elem => elem.classList.contains(className))
const findActiveRev = (arr, className) => {
    for (let i = arr.length - 1; i >= 0; i--)
        if (arr[i].classList.contains(className))
            return i
}
const insertHTML = (elem, parent = document.body) => (parent.insertAdjacentHTML('beforeend', elem), parent.lastElementChild)
const createElem = (tag, className) => (...value) => `<${tag} class="${className}">${value.join('')}</${tag}>`


const showPieces = (arr, pieces) => {
    return () => {
        const piece = arr.slice(0, pieces)
        arr = arr.slice(pieces)
        return { piece, arr }
    }
}

const update = () => {
    window.onload = () => {
        const elem = document.querySelector('.gallery-imgs')
        const msnry = new Masonry(elem, {
            itemSelector: '.img__gallery',
            gutter: 10,
        })
    }
}

const loadImgServer = (data, loader, button, parent, cb) => {
    const response = cb(data)
    data.arr.length ? button.classList.add('hidden') : button.remove()
    setTimeout(() => {
        loader.remove()
        button.classList.remove('hidden')
        insertHTML(response, parent)
        update()
    }, 1000)
}

const loadMore = (parent, loaderParent, btn, arr, amount, cb) => {
    const loadMoreFunc = showPieces(arr, amount)
    const loader = insertHTML(loaderStr, loaderParent)
    loadImgServer(loadMoreFunc(), loader, btn, parent, cb)
    btn.addEventListener('click', () => {
        const loader = insertHTML(loaderStr, loaderParent)
        loadImgServer(loadMoreFunc(), loader, btn, parent, cb)
    })
}

const amazingImg = obj => `
<img class="img__work" src="${obj.url}" data-type="${obj.type}"/>
<div class="img__work--hover">
    <div class="img__link-wrapper">
        <a href="#" class="img__link">
            <img src="./img/icons/chain.svg" alt="chain">
        </a>
        <a href="#" class="img__link img__link--fill">
            <img src="./img/icons/square.svg" alt="square">
        </a>
    </div>
    <div class="img__heading">
        <h4 class="img__heading-main">Creative Design</h4>
        <p class="img__heading">${obj.type.split('-').join(' ')}</p>
    </div>
</div>
`
const imgParent = document.querySelector('.work-imgs')
const loadMoreBtn = document.querySelector('#load-works-js')
const imgWrapper = document.querySelector('.work-imgs-wrapper')
loadMore(imgParent, imgWrapper, loadMoreBtn, worksImg, 12, (data) => {
    const type = document.querySelector('.active--border').dataset.work
    const imgs = data.piece.map(elem => (elem.type === type || type === 'all') ?
        createElem('div', 'img-work-wrapper')(amazingImg(elem)) :
        createElem('div', 'img-work-wrapper hidden')(amazingImg(elem)))
    return imgs.join('')
})

const galleryImg = document.querySelector('.gallery-imgs')
const galleryBtn = document.querySelector('#load-gallery-js')
const galleryWrapper = document.querySelector('.gallery-imgs-wrapper')
loadMore(galleryImg, galleryWrapper, galleryBtn, masonryImg, 12,
    (data) => data.piece.map(elem => `<img class="img__gallery" src="${elem.url}"/>`).join(''))