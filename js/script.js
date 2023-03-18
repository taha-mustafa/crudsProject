// Holding The Elements With DOM
let title = document.getElementById("title"); 
let price = document.getElementById("price"); 
let discount = document.getElementById("discount"); 
let total = document.getElementById("total"); 
let count = document.getElementById("count"); 
let category = document.getElementById("category"); 
let submit = document.getElementById("submit"); 
let mood = 'create';
let supporterVariable;
// /////////////////////////////////////////////////////////////

// Changing theme
let iconTheme = document.getElementById("theme-icon");
    iconTheme.onclick = _ => {
    document.body.classList.toggle("light-theme");
    // Check if 
    document.body.classList.contains("light-theme") 
    ? iconTheme.src = "images/moon.png" 
    : iconTheme.src = "images/sun.png";
};
// Changing letterSpacing For The Heading
let crudHead = document.getElementById("crud-head");

crudHead.onmouseenter = (_) => {
    crudHead.style.letterSpacing = "6px";
    crudHead.onmouseleave = (_) => {
        crudHead.style.letterSpacing = "";
    }
};

// //////////////////////////////////////
function totalCount() {
    if (+price.value !== "" && +price.value > +discount.value) {
        total.innerText = +price.value - (+discount.value);
    } else {
        total.innerText = "";
    }
};
// ////////////////////////////////////////////////////////////////////

// Creating Product
let arrForProductObj;
if (localStorage.product != null) {
    arrForProductObj = JSON.parse(localStorage.product);
} else {
    arrForProductObj = [];
}
submit.onclick = _ => {
    let productObject = {
        title: title.value.toLowerCase(),
        price: price.value,
        discount: discount.value,
        total: total.innerText,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value !== "" && price.value !== "" && price.value > 0 && category.value !== "" 
    && count.value <= 120 && discount.value > 0) {
        if (mood === 'create') {
            if (productObject.count > 1) {
                for (let i = 0; i < productObject.count; i++) {
                    arrForProductObj.push(productObject);
                } 
            } else {
                arrForProductObj.push(productObject);
            }   
        } else {
            arrForProductObj[  supporterVariable  ] = productObject;
            mood = 'create';
            submit.innerText = "Create";
            count.style.display = "block";
        };
        clearEveryInput();
    };  

    localStorage.setItem("product", JSON.stringify(arrForProductObj));

    // Clear inputs and total
    function clearEveryInput() {
        title.value = '';
        price.value = '';
        discount.value = '';
        total.innerText = '';
        count.value = '';
        category.value = '';
    };
    showProDetails();
};
// ////////////////////////////////////////////////////////////////////////////////////

// Function To Show Product Details
function showProDetails() {
    let tableData = '';
    for (let i = 0; i < arrForProductObj.length; i++) {
        tableData += `
        <tr>
            <td>${i + 1}</td>
            <td>${arrForProductObj[i].title}</td>
            <td>${arrForProductObj[i].price}</td>
            <td>${arrForProductObj[i].discount}</td>
            <td>${arrForProductObj[i].total}</td>
            <td>${arrForProductObj[i].category}</td>
            <td><button onclick="updateOnePro(${i})" class="generalBtn" id="update">Update</button></td>
            <td><button onclick="deleteOnePro(${i})" class="generalBtn" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById("forTable").innerHTML = tableData;
    totalCount();
};
showProDetails();
// //////////////////////////////////////////////////////////////////////////////////

// Deleting One Product
function deleteOnePro(i) {
    arrForProductObj.splice(i, 1);
    localStorage.product = JSON.stringify(arrForProductObj);
    showProDetails();
};
// /////////////////////////////////////////////////////////////
// Updating One Product
function updateOnePro(i) {
    title.value = arrForProductObj[i].title;
    price.value = arrForProductObj[i].price;
    discount.value = arrForProductObj[i].discount;
    totalCount();
    count.style.display = "none";
    category.value = arrForProductObj[i].category;
    submit.innerText = "Update";
    mood = 'update';
    supporterVariable = i;
    scroll ({
        top: 0,
        behavior: "smooth",
    });
};
// //////////////////////////////////////////////////////////////
// Search Section
let searchMood = "title";
let searchId = document.getElementById("search");
function theSearchMood(id) {
    if (id === "searchByTitle") {
        searchMood = "title";
        searchId.placeholder = `Search By Title`;
    } else {
        searchMood = "category";
        searchId.placeholder = `Search By Category`;
    }
    searchId.focus();
    searchId.value = "";
};

function searchForDetails(value) {
    let tableData = '';
    if (searchMood === "title") {
        for (let i = 0; i < arrForProductObj.length; i++) {
            if (arrForProductObj[i].title.includes(value.toLowerCase())) {
                tableData += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${arrForProductObj[i].title}</td>
                            <td>${arrForProductObj[i].price}</td>
                            <td>${arrForProductObj[i].discount}</td>
                            <td>${arrForProductObj[i].total}</td>
                            <td>${arrForProductObj[i].category}</td>
                            <td><button onclick="updateOnePro(${i})" class="generalBtn" id="update">Update</button></td>
                            <td><button onclick="deleteOnePro(${i})" class="generalBtn" id="delete">Delete</button></td>
                        </tr>
                        `
            }
        }
    } else {
        for (let i = 0; i < arrForProductObj.length; i++) {
            if (arrForProductObj[i].category.includes(value.toLowerCase())) {
                tableData += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${arrForProductObj[i].title}</td>
                            <td>${arrForProductObj[i].price}</td>
                            <td>${arrForProductObj[i].discount}</td>
                            <td>${arrForProductObj[i].total}</td>
                            <td>${arrForProductObj[i].category}</td>
                            <td><button onclick="updateOnePro(${i})" class="generalBtn" id="update">Update</button></td>
                            <td><button onclick="deleteOnePro(${i})" class="generalBtn" id="delete">Delete</button></td>
                        </tr>
                        `
            }
        }
    }
    document.getElementById("forTable").innerHTML = tableData;
};