const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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
    li.appendChild(document.createTextNode(capitalizeFirstLetter(newItem)));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to DOM
    itemList.appendChild(li);

    checkUI();

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
function capitalizeFirstLetter(string) {
    if (string.length === 0){
        return string;
    }

    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Remove Items
function removeItem(e) {
    // If the parent element's class list contains 'remove-item'
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm(`Are you sure you want to remove ${e.target.parentElement.parentElement.innerText}?`)){
            e.target.parentElement.parentElement.remove();

            checkUI();
        }
    }
}

// Remove all Items
function clearItems(e) {
    if (confirm('Are you sure you want to clear everything?')){
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        checkUI();
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
function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Event Listeners
// Snaps to Input field
document.addEventListener('keydown', (e) => {
    if(e.key === '/' && e.target.tagName != 'INPUT'){
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
// Check for filter
itemFilter.addEventListener('input', filterItems);



checkUI();