const addItems = document.querySelector('.add-items')//form
const itemList = document.querySelector('.plates')//列表

const addItem = (e) => {
    e.preventDefault()//阻止表单提交

}

addItems.addEventListener('submit', addItem)