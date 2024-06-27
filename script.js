console.log("start script...");

let totalCost = 0;
let money = 6; 
document.addEventListener("DOMContentLoaded", function () {
    const ingredientButtons = document.querySelectorAll(".ingredient-button");
    const addedIngredientsDiv = document.querySelector(".addedIngredients");
    const receiptContents = document.querySelector(".receiptcontents");
    const costDisplay = document.querySelector(".costofhamburger");
    const checkoutButton = document.querySelector(".checkout-button");
    const message = document.querySelector(".message");
    const ingredientPrices = {
        cheese: 1, lettuce: 0.5, ketchup: 0.5, tomato: 0.5, meat: 4,
        egg: 1, mayonaise: 0.5, salami: 1, cucumber: 0.5,
        champions: 1, pepper: 0.5, pickle: 0.5
    };
    
function toggleIngredient(ingredientType) {
     const existingIngredient = addedIngredientsDiv.querySelector(`img[data-ingredient="${ingredientType}"]`);
        if (existingIngredient) {
            existingIngredient.remove();

//https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle//

    const receiptItem = receiptContents.querySelector(`li[data-ingredient="${ingredientType}"]`);
        if (receiptItem) {
                receiptItem.remove();
            }

        totalCost -= ingredientPrices[ingredientType];
        costDisplay.textContent = `Totaal: €${totalCost}`;

        } else {
            if (totalCost + ingredientPrices[ingredientType] <= money) {
                const ingredientImg = document.createElement("img");
                ingredientImg.src = `img/${ingredientType}.png`;
                ingredientImg.alt = ingredientType;
                ingredientImg.setAttribute("data-ingredient", ingredientType);
                addedIngredientsDiv.appendChild(ingredientImg);
              

                const listItem = document.createElement("li");
                listItem.textContent = `${ingredientType} - €${ingredientPrices[ingredientType]}`;
                listItem.setAttribute("data-ingredient", ingredientType);
                receiptContents.appendChild(listItem);

                totalCost += ingredientPrices[ingredientType];
                costDisplay.textContent = `Totaal: €${totalCost}`;
            } else {
                message.textContent = "Je hebt geen genoeg geld om dit item toe te voegen.";
                message.style.color = "red";
                setTimeout(() => {
                    message.textContent = "";
                }, 2000);
            }
        }
    }

    ingredientButtons.forEach(button => {
        button.addEventListener("click", function () {
            const ingredientType = button.getAttribute("data-ingredient-type");
            toggleIngredient(ingredientType);
        });
    });

    checkoutButton.addEventListener("click", function () {
        if (totalCost <= money) {
            message.textContent = `Je hebt betaald. Bedankt voor je aankoop!`;
            totalCost = 0;
            costDisplay.textContent = `Totaal: €${totalCost}`;
        }
    });
    //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener//

});
    const playAgainButton = document.querySelector('.playagainbutton');
    playAgainButton.addEventListener('click', function () {
        location.reload();
    });


