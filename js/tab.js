function createTab(parent, tab, activeClass, cb) {
    parent.addEventListener('click', e => {
        if (![...e.target.children].length) {
            const indexActiveHeading = firstActive([...tab], activeClass)
            tab[indexActiveHeading].classList.remove(activeClass)
            e.target.classList.add(activeClass)
            cb(e)
        }
    })
}

const tabs = document.querySelector('.services__tabs .tabs')
const tabsHeading = document.querySelectorAll('.services__tabs .tab__item')
const tabsContent = document.querySelectorAll('.services__tabs .tab-content__item')
createTab(tabs, tabsHeading, 'active', (e) => {
    const obj = [...tabsContent].reduce((obj, item, index) => (obj[item.dataset['tab']] = index, obj), {})
    const indexShowLi = firstActive([...tabsContent], 'visible')
    tabsContent[indexShowLi].classList.remove('visible')
    tabsContent[obj[e.target.dataset['tab']]].classList.add('visible')
})

const workTabs = document.querySelector('.work__tabs .tabs')
const workTabsHeading = document.querySelectorAll('.work__tabs .tab__item')

createTab(workTabs, workTabsHeading, 'active--border', (e) => {
    const imgs = document.querySelectorAll('.img__work')
    if (e.target.dataset.work !== 'all')
        return imgs.forEach(elem =>
            (elem.dataset.type !== e.target.dataset.work) ?
            elem.closest('.img-work-wrapper').classList.add('hidden') :
            elem.closest('.img-work-wrapper').classList.remove('hidden'))

    return imgs.forEach(elem => elem.closest('.img-work-wrapper').classList.remove('hidden'))
})