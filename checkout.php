<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/checkout.css">
    <title>Document</title>
</head>

<body>
    <!-- Checkout Section Begin -->
    <section class="checkout spad">
        <div class="container">
            <div class="checkout__form">
                <h4>Billing Details</h4>
                <form action="#">
                    <div class="checkout__input">
                        <p>Fist Name<span>*</span></p>
                        <input type="text">
                    </div>
                    <div class="checkout__input">
                        <p>Last Name<span>*</span></p>
                        <input type="text">
                    </div>
                    <div class="checkout__input">
                        <p>Address<span>*</span></p>
                        <input type="text" placeholder="Street Address" class="checkout__input__add">
                        <input type="text" placeholder="Apartment, suite, unite ect (optinal)">
                    </div>
                    <div class="checkout__input">
                        <p>Town/City<span>*</span></p>
                        <input type="text">
                    </div>
                    <div class="checkout__input">
                        <p>Country/State<span>*</span></p>
                        <input type="text">
                    </div>
                    <div class="checkout__input">
                        <p>Phone<span>*</span></p>
                        <input type="text">
                    </div>
                    <div class="checkout__input">
                        <p>Email<span>*</span></p>
                        <input type="text">
                    </div>
                    <div class="checkout__input">
                        <p>Order notes<span>*</span></p>
                        <input type="text" placeholder="Notes about your order, e.g. special notes for delivery.">
                    </div>
                    <div class="checkout__order">
                        <h4>Your Order</h4>
                        <div class="checkout__order__products">Products <span>Total</span></div>
                        <ul>
                            <li>Product1 <span>$75.99</span></li>
                            <li>Product2 <span>$151.00</span></li>
                        </ul>
                        <div class="checkout__order__subtotal">Subtotal <span>$226.99</span></div>
                        <div class="checkout__order__total">Total <span>$226.99</span></div>

                        <button type="submit" class="site-btn">PLACE ORDER</button>
                    </div>


                </form>
            </div>
        </div>
    </section>
    <!-- Checkout Section End -->
</body>

</html>