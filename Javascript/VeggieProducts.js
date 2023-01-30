//This jQuery method creates a dropdown effect with the product menu which displays tabs to other sections of the web page.
$('#Product-Menu').click(function() {
    $('.sub-nav').slideToggle(400);
});


$(".coupon-submit-btn").click(function() {
    $(".product-container").animate({left: "250px"});
});


// Array that stores the individual product details.
let productItemArray = [
    {
        title:  "ASPARAGUS",
        image:  "Images/Veggies/Asparagus.jfif",
        qty:    0,
        tag:    "ASPARAGUSTag",
        price:  62.99
    },
    {
        title:  "BROCCOLI",
        image:  "Images/Veggies/Broccoli.jfif",
        qty:    0,
        tag:    "BROCCOLITag",
        price:  24.99
    },
    {
        title:  "CABBAGE",
        image:  "Images/Veggies/Cabbage.jfif",
        qty:    0,
        tag:    "T-BONETag",
        price:  16.99
    },
    {
        title:  "PEPPERS",
        image:  "Images/Veggies/Peppers.jfif",
        qty:    0,
        tag:    "PEPPERSTag",
        price:  38.99
    },
    {
        title:  "CARROTS",
        image:  "Images/Veggies/Carrots.jfif",
        qty:    0,
        tag:    "CARROTSTag",
        price:  12.99
    },
    {
        title:  "CORN",
        image:  "Images/Veggies/Corn.jpg",
        qty:    0,
        tag:    "CORNTag",
        price:  24.99
    },
    {
        title:  "TOMATO",
        image:  "Images/Veggies/Tomato.jfif",
        qty:    0,
        tag:    "TOMATOTag",
        price:  24.99
    },
    {
        title:  "POTATO",
        image:  "Images/Veggies/Potato.jfif",
        qty:    0,
        tag:    "POTATOTag",
        price:  34.99
    },

]

// For loop that loops through the add to cart btns and invokes the following functions:    1. cartNumbers and 2. updateCartTotal
let addToCartButtons = document.getElementsByClassName("Add-to-cart-button");
for(let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', () => {
        cartNumbers(productItemArray[i]);
        updateCartTotal(productItemArray[i])
    })
}


// The cartNumbers function counts the amount of times the Add To Cart Btn's are clicked and stores the total in the localstorage.
// The cartNumbers function also invokes the setItems function.
function cartNumbers(product) {        
        let productNumbers = localStorage.getItem("cartNumbers");
        
        productNumbers = parseInt(productNumbers);
        
        if(productNumbers) {
            localStorage.setItem("cartNumbers", productNumbers + 1);
        } else {
            localStorage.setItem("cartNumbers", 1);
        }
        
        setItems(product);
    }

// The setItems function

    function setItems(product) {
        let cartItemsNew = localStorage.getItem("productsInCart");
        cartItemsNew = JSON.parse(cartItemsNew);

        if(cartItemsNew != null) {
            if(cartItemsNew[product.tag] == undefined) {
            cartItemsNew = {
                ...cartItemsNew,
                [product.tag]: product
            }
        }    
            cartItemsNew[product.tag].qty += 1;
        } else {
             product.qty = 1;
             cartItemsNew = {
                [product.tag]: product
        }
    }
        localStorage.setItem("productsInCart", JSON.stringify(cartItemsNew));
        
    }



/* Adding an event listener to all the quantity inputs */    
   var inputQuantity = document.getElementsByClassName('cart-quantity-input');     // Please check //
    for (var i = 0; i < inputQuantity.length; i++) {        //  Please check    //
        var input = inputQuantity[i];
        /*input.addEventListener('change', quantityChanged)*/
        
    }

/*};*/




function quantityChanged(event) {
    var input = event.target;
    
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}


// The updateCartTotal function adds the prices of all the products that have been selected and alerts the customer of the total amount due. 
function updateCartTotal(product) {
    let cartCost = localStorage.getItem("totalCost");
    
    if(cartCost != null) {
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);  
   
    }else {
       localStorage.setItem("totalCost", product.price);
    }
    
    cartCost = localStorage.getItem("totalCost");

    let subTotal = localStorage.getItem("subTotal");

    if(subTotal != null) {
        subTotal = parseFloat(subTotal);
        localStorage.setItem("subTotal", subTotal + product.price);
    } else {
        localStorage.setItem("subTotal", product.price)
    }

    subTotal = localStorage.getItem("subTotal");

    const subTotal1 = Number(subTotal);
    const subTotal2 = subTotal1.toFixed(2);
    
  localStorage.setItem("subTotal", subTotal2)

   
   const newVat = product.price * 0.15;
    
   let newTestResult = Number(cartCost) + newVat;
   let bestResult = newTestResult.toFixed(2);

   localStorage.setItem("totalCost", bestResult)

    alert("Your current total is: " + "R" + bestResult);



   }

// The vatTotal function works out what the vat total will be of all the products in the cart.
   window.addEventListener("load", function vatTotal() {
    let productCost = localStorage.getItem("subTotal");
    let vatAmount = productCost * 0.15;
    let bestResult = vatAmount.toFixed(2)
    localStorage.setItem("vatTotal", bestResult)
    
})

// The couponDiscount function subtracts 15% of the cart total and informs the customer of their total due after the discount.
let couponBtn = document.getElementsByClassName('coupon-submit-btn');


function couponDiscount() {
    let totalCartCost = localStorage.getItem("totalCost");
    totalCartCost = JSON.parse(totalCartCost);
    let couponDiscount = totalCartCost * 0.15;
    let newResult = totalCartCost - couponDiscount;
    let discountCouponTotal = Number(newResult).toFixed(2); 
    alert("Your total after the coupon discount is " + discountCouponTotal)
    localStorage.setItem("totalCost", discountCouponTotal) 
    $(".container-coupon-promo").hide();
    location.reload();
}

function deliver() {
    $("#deliver").click(function() {
        $(".delivery").show();
    });
};
/*deliver()*/

const newDel = document.getElementsByClassName(".delivery");

function hideDelivery() {
    $(newDel).hide();
}
hideDelivery()


$(".cart-item-image").click(function() {
    $("this").hide('slow');
});


const del = $(".delivery").hide();




let result1 = "200.00";
let result2 = "100.00";
let num1 = [];

function sameDayDelivery(checkbox, some) {
    $(".delivery").hide();
    var checkBoxes = document.getElementsByName("delivery-meth");
    $(".delivery").hide();
    checkBoxes.forEach((item) => {
        if (item !== checkbox) localStorage.setItem("newCheckBox", item.checked = false);
    })
/*      ------- Testing -------     -------Testing ----------- */

 var checkboxValues = localStorage.getItem("newCheckBox");
 var newest = JSON.parse(checkboxValues);
 

 /*      ------- Testing -------     -------Testing ----------- */



    
    const delRes = localStorage.getItem("CreateLocalStorage");

    if(delRes != null) {
        if(delRes != result1) {
           const test = Object.values(delRes)
           test.splice(0, 6)
           localStorage.setItem("CreateLocalStorage", result1)
          
            const testLocalStorage2 = localStorage.getItem("totalCost");
            const testLocalStorageDel = localStorage.getItem("CreateLocalStorage");

            const endResult = Number(testLocalStorage2) - Number(result2)
            
            const final = endResult + Number(result1);
            
            localStorage.setItem("totalCost", final);

        } else {
            localStorage.setItem("CreateLocalStorage", result1);
        }
        } else {
            const newTest = localStorage.getItem("CreateLocalStorage");
            const newTest1 = localStorage.getItem("totalCost");

            const newTest2 = Number(newTest1) + Number(result1);

            let finalNum = num1.push(newTest2)

            localStorage.setItem("CreateLocalStorage", result1);
            localStorage.setItem("totalCost", newTest2);

            
    
    }
    location.reload();
    /*$(".delivery").show();*/
    $(".delivery").hide();
};








/* I am testing to see if i can change the total values of display,once this function runs */
function laterDelivery(checkbox, displayCart) {

   /*
    var checkBoxes = document.getElementsByName("delivery-meth");
    checkBoxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
        console.log(checkBoxes)
        console.log(item)
        console.log(checkbox)
    }); 
    console.log(typeof checkBoxes)
    console.log(typeof item)
    console.log(typeof checkbox)
*/


     /*      ------- Testing -------     -------Testing ----------- */
     var checkBoxes = document.getElementsByName("delivery-meth");
     checkBoxes.forEach((item) => {
         if (item !== checkbox) localStorage.setItem("newCheckBox", item.checked = false);
     })


     var checkboxValues = localStorage.getItem("newCheckBox");
     console.log(checkboxValues)

        /*      ------- Testing -------     -------Testing ----------- */






    const delRes = localStorage.getItem("CreateLocalStorage");

    if(delRes != null) {
        if(delRes != result2) {
            const test = Object.values(delRes)
            test.splice(0, 6)
            localStorage.setItem("CreateLocalStorage", result2)


             const testLocalStorage2 = localStorage.getItem("totalCost");
             const testLocalStorageDel = localStorage.getItem("CreateLocalStorage");
 
             const endResult = Number(testLocalStorage2) - Number(result1)
             
             const final = endResult + Number(result2);
             
             localStorage.setItem("totalCost", final);
 

         } else {
             localStorage.setItem("CreateLocalStorage", result2);
         }
    } else {
        const newTest = localStorage.getItem("CreateLocalStorage");
            const newTest1 = localStorage.getItem("totalCost");

            var newTest2 = Number(newTest1) + Number(result2);
            
            localStorage.setItem("CreateLocalStorage", result2);
            localStorage.setItem("totalCost", newTest2);
          





    }
   location.reload();
  
}

 








/*
$("p").click(function myNewFunction(){
    $("this").hide('slow');
    });

    myNewFunction();


*/


function deliver() {
    $(".confirm-order-btn").click(function() {
        $(".products").hide(300);
        
    });
};

$(".confirm-order-btn").click(function myNewFunction(){
    $(".products").hide('slow');
    });
    




function p() {
    $(".product-container").hide(300);
    alert("Your order is successful. Your reference number is: " + Math.floor(Math.random() * 1000))
    localStorage.clear()
};    


// The displayCart function displays the final layout and all the information selected by the customer on the store cart page.
window.addEventListener("load", function displayCart() {

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    const subTotal = localStorage.getItem("subTotal")
    let cartCost = localStorage.getItem("totalCost");
    
    let newCartCost = localStorage.getItem("vatTotal");
    /*
    let cartTotalCost = Number(newCartCost) + Number(cartCost);
    localStorage.setItem("totalCost", cartTotalCost.toFixed(2))*/
   
    
    if(cartItems && productContainer) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
        

            <div class="cart-item cart-column">
            <img class="cart-item-image" src="${item.image}" width="100" height="100">
            <span class="cart-item-title">${item.title}</span>
            
        <span class="cart-item-price">R${item.price}</span>       
        
            <input class="cart-quantity-input" type="number" value="${item.qty}">
            
            
            <p class="item-total">
                R${item.price * item.qty}
                </p>
            <button class="btn btn-danger" type="button" onclick="deleteCartItems()">REMOVE</button>    
        </div>
        

            `
        });

        

        productContainer.innerHTML += `
            <div class="basketTotalContainer>
            <form class="deliver-collection">
            <p class="delivery-collection-heading">Please select whether you would like to collect or have us deliver:</p>
            <input type="radio" id="collection" name="receiptMethod">
            <label for="collection">Collect</label>
            <input type="radio" id="deliver" name="receiptMethod" onclick= "testFunction1(this)">
            <label for="deliver">Deliver</label>
            </form>


            <form class="delivery">
            <p class="delivery-method">Please select preferred delivery method</p>
            <input type="checkbox" id="delivery-meth-1" name="delivery-meth" onclick="sameDayDelivery(this)">
            <label for="delivery-meth-1">Same day delivery (R200.00)</label>
            <input type="checkbox" id="delivery-meth-2" name="delivery-meth" onclick="laterDelivery(this)">
            <label for="delivery-meth-2">Between 1 - 2 Days (R100.00)</label>

            </form>

                <p class="basketSubTotalTitle">
                <strong> Sub total:</strong>
                </p>
                <p class="basketSubTotal">
                <strong> R${subTotal}</strong>
                </p>
                <p class="basketVatTitle">
                <strong> VAT @ 15%: </strong>
                </p>
                <p class="basketTotalVat">
                <strong>R${newCartCost}</strong>
                </p>
                <p class="basketTotalTitle">
                <strong> Basket Total: </strong>
                </p>
                <p class="basketTotal">
                <strong> R${cartCost} </strong>
                </p>


                <button type="button" class="confirm-order-btn" onclick="p()">Confirm Order</button>

        `

    }
    
});




function deliver() {
        $(".product-container").hide(300);
        alert("Your order is successful. Your reference number is: " + Math.floor(Math.random() * 1000))
        localStorage.clear()
};

/*
function p() {
    $(".test").hide(300);
    alert("Your order is successful. Your reference number is: " + Math.floor(Math.random() * 1000))
    localStorage.clear()
};
*/



/* The Basket total does not add up correctly */
/*onclick="deleteCartItems()"*/