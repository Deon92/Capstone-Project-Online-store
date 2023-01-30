/*if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
*/


//This jQuery method creates a dropdown effect with the product menu which displays tabs to other sections of the web page.
$('#Product-Menu').click(function() {
    $('.sub-nav').slideToggle(400);
});


// Array that stores the individual product details.
let productItemArray = [
    {
        title:  "RIBEYE",
        image:  "Images/Meat/Ribeye.jfif",
        qty:    0,
        tag:    "RIBEYETag",
        price:  139.99
    },
    {
        title:  "BACK RIBS",
        image:  "Images/Meat/Ribs.jfif",
        qty:    0,
        tag:    "BACKRIBSTag",
        price:  199.99
    },
    {
        title:  "T-BONE",
        image:  "Images/Meat/T-Bone.jfif",
        qty:    0,
        tag:    "T-BONETag",
        price:  129.99
    },
    {
        title:  "PORTERHOUSE",
        image:  "Images/Meat/Porterhouse.jfif",
        qty:    0,
        tag:    "PORTERHOUSETag",
        price:  165.99
    },
    {
        title:  "FILET MIGNON",
        image:  "Images/Meat/Filet.jfif",
        qty:    0,
        tag:    "FILETMIGNONTag",
        price:  295.99
    },
    {
        title:  "SHANK",
        image:  "Images/Meat/Shank.jpg",
        qty:    0,
        tag:    "SHANKTag",
        price:  85.99
    },
    {
        title:  "WHOLE BRISKET",
        image:  "Images/Meat/Brisket.jfif",
        qty:    0,
        tag:    "WHOLEBRISKETTag",
        price:  139.99
    },
    {
        title:  "BEEF",
        image:  "Images/Meat/Beef.jfif",
        qty:    0,
        tag:    "BEEFTag",
        price:  99.99
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



let sameDayDelAmount = "200.00";
let laterDelAmount = "100.00";


function sameDayDelivery(checkbox, some) {
    var checkBoxes = document.getElementsByName("delivery-meth");
    checkBoxes.forEach((item) => {
        if (item !== checkbox) localStorage.setItem("newCheckBox", item.checked = false);
    })
    const delRes = localStorage.getItem("delivery");
    
    if(delRes != null) {
        if(delRes != sameDayDelAmount) {
           localStorage.setItem("delivery", sameDayDelAmount)
        } else {
            localStorage.setItem("delivery", sameDayDelAmount);
        }
        } else {
            const basketTotal = localStorage.getItem("totalCost");
            const basketTotalWithDel = Number(basketTotal) + Number(sameDayDelAmount);
            localStorage.setItem("delivery", sameDayDelAmount);
            localStorage.setItem("totalCost", basketTotalWithDel);           
    }
    location.reload();
};








/* I am testing to see if i can change the total values of display,once this function runs */
function laterDelivery(checkbox, displayCart) {
    var checkBoxes = document.getElementsByName("delivery-meth");
    checkBoxes.forEach((item) => {
        if (item !== checkbox) localStorage.setItem("newCheckBox", item.checked = false);
       
    }); 
    
    const delRes = localStorage.getItem("delivery");

    if(delRes != null) {
        if(delRes != laterDelAmount) {
            localStorage.setItem("delivery", laterDelAmount)
         } else {
             localStorage.setItem("delivery", laterDelAmount);
         }
         } else {
            const basketTotal = localStorage.getItem("totalCost");
            const basketTotalWithDel = Number(basketTotal) + Number(laterDelAmount);
            localStorage.setItem("delivery", laterDelAmount);
            localStorage.setItem("totalCost", basketTotalWithDel); 
    }
   location.reload();
  
}


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
   console.log(newCartCost)
    
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
                
        </div>
        

            `
        });

        

        productContainer.innerHTML += `
            <div class="basketTotalContainer>
            <form class="deliver-collection">
            <p class="delivery-collection-heading">Please select whether you would like to collect or have us deliver:</p>
            <input type="radio" id="collection" name="receiptMethod">
            <label for="collection">Collect</label>
            <input type="radio" id="deliver" name="receiptMethod">
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




