console.log("start script...");

// Variables
let money = 6;
let cost = 0;
const moneyDisplay = document.querySelector("h1");
const message = document.querySelector(".message");
const costOfHamburger = document.querySelector(".costofhamburger");
const ingredientContainer = document.querySelector(".addedIngredients");
const playAgainButton = document.querySelector(".playagainbutton");
const receiptContents = document.querySelector(".receiptcontents");
const payButton = document.querySelector(".checkout-button");
const ingredientButtons = document.querySelectorAll(".ingredient-button");

const addedIngredientsMap = new Map(); //https://www.digitalocean.com/community/tutorials/4-uses-of-javascripts-arraymap-you-should-know
const receiptItemsMap = new Map(); 



function addIngredient(ingredientSrc, ingredientName) {
    if (!addedIngredientsMap.has(ingredientName) && money >= 2) {
        const addedIngredient = document.createElement("img");
        addedIngredient.src = ingredientSrc;
        ingredientContainer.appendChild(addedIngredient);
        addedIngredientsMap.set(ingredientName, addedIngredient);
        cost += 2;
        costOfHamburger.textContent = "Totale kost " + " €" + cost;
        console.log(ingredientName + " added.");
        addToReceipt(ingredientName);
    } else if (addedIngredientsMap.has(ingredientName)) {
        const addedIngredient = addedIngredientsMap.get(ingredientName);
        ingredientContainer.removeChild(addedIngredient);
        addedIngredientsMap.delete(ingredientName);
        cost -= 2;
        costOfHamburger.textContent = "Totale kost " + "€" + cost;
        console.log(ingredientName + " removed.");
        removeFromReceipt(ingredientName);
    }
}

function addIngredientHandler(event) {
    const ingredientType = event.target.dataset.ingredientType; //https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    const ingredientSrc = `img/${ingredientType}.png`;

    addIngredient(ingredientSrc, ingredientType);
}

// voegt een ingredient toe aan de bon
function addToReceipt(ingredientName) {
    const addedToReceipt = document.createElement("li");
    addedToReceipt.textContent = ingredientName;
    receiptContents.appendChild(addedToReceipt);
    receiptItemsMap.set(ingredientName, addedToReceipt);
    console.log("added " + ingredientName + " to receipt");
}

// verwijdert een ingredient van de bon
function removeFromReceipt(ingredientName) {
    const addedToReceipt = receiptItemsMap.get(ingredientName);
    if (addedToReceipt) {
        receiptContents.removeChild(addedToReceipt);
        receiptItemsMap.delete(ingredientName);
    }
    console.log("removed " + ingredientName + " from receipt");
}

//melding als er niet genoeg geld is
function payBill() {
    if (money >= cost) {
        playAgainButton.style.visibility = "visible";
        money -= cost;
        moneyDisplay.textContent = "Jij hebt nu " + "€" + money;
        costOfHamburger.textContent = "Jij hebt betaald.";
        payButton.remove();
        ingredientButtons.forEach(button => button.removeEventListener('click', addIngredientHandler));
        message.textContent = "Geniet van je hamburger!";
    } else {
        message.textContent = "Jij hebt geen genoeg geld.";
        message.style.color = "red";
        setTimeout(() => {
            message.textContent = "";
        }, 1000);
    }
}

// herstart de pagina
function playAgain() {
    location.reload();
}

playAgainButton.addEventListener('click', playAgain);
ingredientButtons.forEach(button => button.addEventListener('click', addIngredientHandler));
payButton.addEventListener('click', payBill);       