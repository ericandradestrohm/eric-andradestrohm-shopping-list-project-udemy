const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;


// Loads stored items
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    resetUI();
}

// Add Element
function onAddItemSubmit(e) {
    e.preventDefault();
    let newItem = itemInput.value;
    newItem = capitalizeFirstLetter(newItem);
    // Basic input validation
    if(newItem === '') {
        alert('Please enter an item');
        return;
    }
    // Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            alert('Item already exists!');
            return;
        }
    }

    
    // Create item DOM element
    addItemToDOM(newItem);
    // Add item to localStorage
    addItemToStorage(newItem);

    resetUI();

    itemInput.value = '';
}
function capitalizeFirstLetter(string) {
    if (string.length === 0){
        return string;
    }

    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function addItemToDOM(item) {
    // Create the list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const editButton = createButton('btn-link', 'fa-solid fa-pen');
    editButton.id = 'edit-button';
    const removeButton = createButton('remove-item btn-link text-red', 'fa-solid fa-xmark');

    const div = document.createElement('div');
    div.appendChild(editButton);
    div.appendChild(removeButton);

    li.appendChild(div);
    // Add li to DOM
    itemList.appendChild(li);
}

function createButton(classes, iconClass) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon(iconClass);

    button.appendChild(icon);

    return button;
}
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to JSON  string and put back in local storage
    localStorage.setItem(`items`, JSON.stringify(itemsFromStorage));
}

// Gets the items from storage
function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem(`items`) === null) {
        // If storage is empty, make itemsFromStorage an empty array
        itemsFromStorage = [];
    } else {
        // If there are items, then parse the items back to an array
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

// Checks where we're clicking
function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        if (e.target.parentElement.id === 'edit-button'){
            setItemToEdit(e.target.parentElement.parentElement.parentElement);
        }
    }
}

// Duplicate Item check
function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
    formBtn.style.backgroundColor = 'green';
    itemInput.value = item.textContent;
}

// Remove Items
function removeItem(item) {
    if (confirm(`Are you sure you want to remove ${item.innerText}?`)){ 
        // Remove item from DOM
        item.remove();
        // Remove item from Storage
        removeItemFromStorage(item.textContent);
        resetUI();
    }
}
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    // Filter our item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
// Remove all Items
function clearItems(e) {
    if (confirm('Are you sure you want to clear everything?')){
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }

        // Clear from localstorage
        localStorage.removeItem('items');

        resetUI();
    }
}

// Filters items as you type
function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    
    items.forEach(item => {
        const itemName = item.innerText.toLowerCase();
        
        if (itemName.indexOf(text) === -1) {
            item.style.display = 'none';
        } else {
            item.style.display = 'flex';
        }
    });
}

// Checks UI to hide filter and clear button
function resetUI() {
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

// Initialize app
function init() {
    // Event Listeners
    // Snaps to Input field
    document.addEventListener('keydown', (e) => {
        if(e.key === '/' && e.target.tagName != 'INPUT'){
            e.preventDefault();
            itemInput.focus();
        }
    });
    // Adds item on submit
    itemForm.addEventListener('submit', onAddItemSubmit);
    // Removes item on button click
    itemList.addEventListener('click', onClickItem);
    // Removes all items on click of clearBtn
    clearBtn.addEventListener('click', clearItems);
    // Check for filter
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded',displayItems);

    resetUI();
}

init();