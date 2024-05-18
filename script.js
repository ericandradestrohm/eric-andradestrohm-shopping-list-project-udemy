const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

// Add Element
function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    // Basic input validation
    if(newItem === '') {
        alert('Please enter an item');
        return;
    }

    // Create the list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

    itemInput.value = '';
}
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;

}

// Remove Items
function removeItem(e) {
    // If the parent element's class list contains 'remove-item'
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove();
    }
}

// Remove all Items
function clearItems(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}

// Event Listeners

// Snaps to Input field
document.addEventListener('keydown', (e) => {
    if(e.key === '/'){
        e.preventDefault();
        itemInput.focus();
    }
});

// Adds item on submit
itemForm.addEventListener('submit', addItem);
// Removes item on button click
itemList.addEventListener('click', removeItem);
// Removes all items on click of clearBtn
clearBtn.addEventListener('click', clearItems);