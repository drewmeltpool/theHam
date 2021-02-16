const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
const sliderContent = document.querySelectorAll('.slider-content .slide__img')
const sliderWrapper = document.querySelector('.slides-wrapper')
const slider = document.querySelector('.slides')

const updateContent = (dataValue, parent, needToChange, className) => {
    parent.forEach(cont => (dataValue === cont.dataset.slide) ? cont.closest(needToChange).classList.add(className) :
        cont.closest(needToChange).classList.remove(className))
}

const initSlider = (parent, amount) => {
    let start = [...parent.children].slice(0, amount)
    let end = [...parent.children].slice(parent.children.length - amount).reverse()
    for (let i = 0; i < amount; i++) {
        parent.append(start[i].cloneNode(true))
        parent.prepend(end[i].cloneNode(true))
    }
}

const sliderCaruosel = (numVisibleImgs, parent, imgsClass) => {
    const moveSlide = (anim, slider, elems, className, value, numSlides) => {
        slider.style.transition = anim
        const index = (numSlides > 0) ?
            (firstActive([...elems], className) + numSlides) :
            (findActiveRev([...elems], className) + numSlides)
        elems.forEach(img => (elems[index].dataset.slide === img.dataset.slide) ?
            img.classList.add(className) :
            img.classList.remove(className))
        pos += value
        slider.style.transform = `translateX(${pos}px)`
        return index
    }

    initSlider(parent, numVisibleImgs)
    const slides = document.querySelectorAll(imgsClass)
    const sliderImglen = slides.length - numVisibleImgs * 2
    const slideWidth = 90
    const end = slides.length * slideWidth - numVisibleImgs * slideWidth
    slider.style.transform = `translateX(${-slideWidth * numVisibleImgs}px)`
    let pos = parseInt((slider.style.transform).match(/translate.*\((.+)\)/)[1])
    let can = true

    next.addEventListener('click', () => {
        if (!can) return
        const curr = moveSlide('ease-in-out .3s', slider, slides, 'active--slide', -slideWidth, 1)
        updateContent(slides[curr].dataset.slide, sliderContent, '.slider-content__item', 'visible--slide')
        can = false
    })

    prev.addEventListener('click', () => {
        if (!can) return
        const curr = moveSlide('ease-in-out .3s', slider, slides, 'active--slide', slideWidth, -1)
        updateContent(slides[curr].dataset.slide, sliderContent, '.slider-content__item', 'visible--slide')
        can = false
    })

    sliderWrapper.addEventListener('transitionend', () => {
        const currPos = Math.abs(pos)
        if (currPos >= end) {
            moveSlide('ease-in-out 0s', slider, slides, 'active--slide', sliderImglen * slideWidth, sliderImglen)
        } else if (currPos <= 0) {
            moveSlide('ease-in-out 0s', slider, slides, 'active--slide', -sliderImglen * slideWidth, -sliderImglen)
        }
        can = true
    })

    sliderWrapper.addEventListener('click', e => {
        if (e.target.classList.contains('slide__img')) {
            const curr = e.target.dataset.slide
            slides.forEach(img => (curr === img.dataset.slide) ? img.classList.add('active--slide') : img.classList.remove('active--slide'))
            updateContent(curr, sliderContent, '.slider-content__item', 'visible--slide')
        }
    })
}

sliderCaruosel(4, slider, '.slides .slide__img')