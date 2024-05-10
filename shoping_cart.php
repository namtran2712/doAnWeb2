<?php
include 'database/connect.php';

session_start();
// Sử dụng hàm để lấy thông tin từ bảng cart và particular_cart
if(isset($_SESSION["accountCurrent"])){
    $account_id=$_SESSION["accountCurrent"]["idAccount"];
    unset($_SESSION['cart']);
    getCartInfoByAccountId($account_id);
}
// Hàm để lấy thông tin từ bảng cart và particular_cart dựa trên account_id
function getCartInfoByAccountId($account_id)
{
    global $connect;

    // Chuẩn bị câu truy vấn SQL để lấy thông tin sản phẩm từ bảng particular_cart và particular_products
    $query = "SELECT pc.ID_PRODUCT, pc.SIZE, pc.QUANTITY, pp.PRICE
              FROM particular_cart pc
              JOIN particular_products pp ON pc.ID_PRODUCT = pp.ID_PRODUCT AND pc.SIZE = pp.SIZE
              WHERE pc.ID_CART IN (
                  SELECT ID_CART FROM cart WHERE ID_ACCOUNT = $account_id
              )";

    // Thực hiện truy vấn để lấy thông tin sản phẩm từ bảng particular_cart và particular_products
    $result = mysqli_query($connect, $query);

    // Kiểm tra xem có kết quả trả về không
    if ($result && mysqli_num_rows($result) > 0) {
        // Duyệt qua các dòng dữ liệu và thêm vào mảng
        while ($row = mysqli_fetch_assoc($result)) {
            // Thêm thông tin sản phẩm vào session cart
            $_SESSION['cart'][] = array(
                'product_id' => $row['ID_PRODUCT'],
                'quantity' => $row['QUANTITY'],
                'size' => $row['SIZE'],
                'price' => $row['PRICE']
            );
        }
    } else {
        // Hiển thị thông báo nếu không tìm thấy giỏ hàng
        // echo "Không tìm thấy giỏ hàng cho tài khoản có ID_ACCOUNT là $account_id";
    }

}
    $sql = "  SELECT *
    FROM accounts ,users 
    WHERE accounts.ID_USER =users.ID_USER AND ID_ACCOUNT =$account_id;";
    $result = mysqli_query($connect, $sql);
    $user = mysqli_fetch_assoc($result);

    $sql = "SELECT * 
    FROM user_shipping_address adr , accounts 
    WHERE adr.ID_ACCOUNT =accounts.ID_Account and accounts.ID_Account = $account_id";
    $result = mysqli_query($connect, $sql);

    $checkEmty=true;
    if(mysqli_num_rows($result)>0)
    {
        $address = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $address[] = $row;
        }
        $checkEmty=false;
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/shoping_cart.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

    <title>Document</title>
</head>

<body>
    <div class="col-lg-12">
        <div class="shoping__cart__btns">
            <a href="index.php" class="primary-btn cart-btn">CONTINUE SHOPPING</a>
            <a href="#" class="primary-btn cart-btn cart-btn-right"><span class="icon_loading"></span>
                Update Cart</a>
        </div>
    </div>

    <?php
    require_once("database/connect.php");
    if (isset($_SESSION['cart']) && !empty($_SESSION['cart'])) {
    ?>
        <section class="shoping-cart spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="shoping__cart__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="shoping__product">Products</th>
                                        <th>Price</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    // Duyệt qua mảng $_SESSION['cart'] và hiển thị thông tin sản phẩm
                                    foreach ($_SESSION['cart'] as $product_id => $product) {
                                        // In thông tin của từng sản phẩm
                                        // echo "Product ID: $product_id<br>";
                                        $item_id = $product_id;
                                        foreach ($product as $key => $value) {
                                            // echo " $key $value <br>";
                                            $price = null;
                                            if ($key === 'product_id') {
                                                $product_id = $value;
                                            } elseif ($key === 'size') {
                                                // size khach chon
                                                $size = $value;
                                            } elseif ($key === 'price') {
                                                $price = $value;
                                            } elseif ($key === 'quantity') {
                                                $quantity = $value;
                                            }
                                        }
                                        $query = "SELECT p.product_name,p.main_image, pp.size, pp.price
                                                FROM products p
                                                INNER JOIN particular_products pp ON p.id_product = pp.id_product
                                                WHERE p.id_product = $product_id";
                                        $result = mysqli_query($connect, $query);

                                        $query_products = "SELECT *
                                                FROM products 
                                                WHERE id_product = $product_id";
                                        $result_sp = mysqli_query($connect, $query_products);
                                        $formatted_price = number_format($price, 0, ',', '.');
                                        if (mysqli_num_rows($result) > 0) {
                                            // Lặp qua mỗi hàng kết quả
                                            while ($row = mysqli_fetch_assoc($result_sp)) {
                                    ?>
                                                <tr id="<?php echo $item_id; ?>" data-id-product="<?php echo $product_id ?>" data-size="<?php echo $size; ?>">
                                                    <td class="shoping__cart__item">
                                                        <div class="cart_item">
                                                            <img class="img_product" src="<?php echo $row['MAIN_IMAGE']; ?>" alt="">
                                                            <h5><?php echo  $row['PRODUCT_NAME']; ?></h5>
                                                        </div>
                                                    </td>
                                                    <td class="shoping__cart__price">
                                                        <span id="selected_price_<?php echo $product_id; ?>"><?php echo $formatted_price ?>đ</span>
                                                    </td>
                                                    <td>
                                                        <select name="size_<?php echo $product_id; ?>" id="size_<?php echo $product_id; ?>">
                                                            <?php while ($row_CTSP = mysqli_fetch_assoc($result)) :

                                                                if ($row_CTSP['size'] !== $size) {
                                                            ?>
                                                                    <option value="<?php echo $row_CTSP['size']; ?>" data-price="<?php echo $row_CTSP['price']; ?>">
                                                                        <?php echo $row_CTSP['size']; ?>
                                                                    </option>
                                                                <?php
                                                                } else {
                                                                ?>
                                                                    <option value="<?php echo $row_CTSP['size']; ?>" data-price="<?php echo $row_CTSP['price']; ?>" selected>
                                                                        <?php echo $row_CTSP['size']; ?>
                                                                    </option>
                                                            <?php
                                                                }
                                                            endwhile
                                                            ?>
                                                        </select>
                                                    </td>
                                                    <td class="shoping__cart__quantity">
                                                        <div class="cart-content_qty">
                                                            <div class="quantity">
                                                                <a href="" class="value-changer_decrease">-</a>
                                                                <input type="text" value="<?php echo $quantity ?>" min="1" class="value-changer_input" data-price="<?php echo $price; ?>">
                                                                <a href="" class="value-changer_increase">+</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="shoping__cart__total" id="<?php echo $product_id; ?>">
                                                        <?php echo number_format($quantity * $price, 0, ',', '.') . 'đ'; ?>
                                                    </td>

                                                    <td >
                                                        <svg class="shoping__cart__item__close" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" >
                                                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                                                        </svg>
                                                    </td>

                                                </tr>
                                    <?php
                                            }
                                        }
                                        // hết if 
                                    }
                                    ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="shoping__continue">
                        <div class="shoping__discount my-3"> 
                            <h5>Discount Codes</h5>
                            <form action="#">
                                <input type="text" placeholder="Enter your coupon code" id="code-discount">
                                <button type="submit" class="site-btn">APPLY COUPON</button>
                            </form>
                        </div>
                    </div>
                    <div class="shoping__checkout">
                        <h5>Cart Total</h5>
                        <ul>
                            <li>Subtotal <span>0đ</span></li>
                            <li>Total <span>0đ</span></li>
                        </ul>
                        <a href="#" class="primary-btn make-bill">PROCEED TO CHECKOUT</a>
                    </div>
                </div>
            </div>
        </section>
    <?php
    } else {
    ?>
    <div class="container-fluid">

            <div class="container_cartnull">
                <p>Giỏ hàng của bạn chưa có sản phẩm</p>
            </div>

        <div class=" container-fluid row">
                    <div class="shoping__continue">
                        <div class="shoping__discount  my-3">
                            <h5>Discount Codes</h5>
                            <form action="#">
                                <input type="text" placeholder="Enter your coupon code" id="code-discount">
                                <button type="submit" class="site-btn">APPLY COUPON</button>
                            </form>
                        </div>
                    </div>
                    <div class="shoping__checkout">
                        <h5>Cart Total</h5>
                        <ul>
                            <li>Subtotal <span>0đ</span></li>
                            <li>Total <span>0đ</span></li>
                        </ul>
                        <a href="#" class="primary-btn make-bill">PROCEED TO CHECKOUT</a>
                    </div>
                </div>
    </div>
    <?php
    }
    ?>

                <div class="modal fade my-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="myModalLabel">Form Check Out</h5>
                        </div>

                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-12 order-md-1">
                                        
                                        <form class="needs-validation" novalidate>
                                            <div class="row">
                                            <div class="col-md-12 mb-3">
                                                <label for="fullName">Full Name</label>
                                                <input type="text" class="form-control" id="fullName" placeholder="" value="<?php echo $user['FULLNAME'] ?>" readonly>
                                            </div>
                                            </div>

                                            <div class="mb-3">
                                            <label for="username">Username</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                <span class="input-group-text">@</span>
                                                </div>
                                                <input type="text" class="form-control" id="username" placeholder="" value="<?php echo $user['USERNAME'] ?>"readonly>
                                  
                                            </div>
                                            </div>

                                            <div class="mb-3">
                                            <label for="phoneNumber">Phone Number</label>
                                            <input type="text" class="form-control" id="phoneNumber" placeholder="" value="<?php echo $user['PHONE_NUMBER'] ?>"readonly>
                                       
                                            </div>
                                            <?php  if($checkEmty==false) {?>
                                                <div class="mb-3">
                                                    <label for="list-address">Address<span class="text-muted">(Default)</span></label>
                                                    <select class="form-select" aria-label="Disabled select example" id="list-address">
                                                        <?php foreach ($address as $key => $value) {?>
                                                            <?php if($value['STATUS_ADDRESS']==1) {?>
                                                                <option selected value="<?php echo $value['SHIPPING_ADDRESS'];?>"><?php echo $value['SHIPPING_ADDRESS'];?></option>
                                                                <?php }else {?>
                                                                    <option value="<?php echo $value['SHIPPING_ADDRESS'];?>"><?php echo $value['SHIPPING_ADDRESS'];?></option>
                                                            <?php }?>
                                                        <?php }  ?>
                                                    </select>
                                                </div>
                                            <?php }?>
                                            <div class="mb-3">
                                                             
                                                <label for="address2">New address<span class="text-muted">(Option)</span></label>
                                                <input type="text" class="form-control" id="address2" placeholder="New shopping address" value="">
                                                <br>
                                                <?php  if($checkEmty==false) {?>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="defaultAddress" checked value="default">
                                                        <label class="form-check-label" for="flexRadioDefault1">
                                                            Use Default address
                                                        </label>
                                                    </div>
                                                <?php }?>
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="newAddress" value="new">
                                                    <label class="form-check-label" for="flexRadioDefault2">
                                                        Create and use new address
                                                    </label>
                                                </div>
                                            </div>

                                            <hr class="">
                                            <!-- #region -->

                                            <h5 class="">Payment</h5>

                                            <div class="d-block my-1">
                                            <div class="custom-control custom-radio">
                                                <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
                                                <label class="custom-control-label" for="credit">Direct</label>
                                            </div>
                                            </div>

                                            <hr class="mb-4">
                                            <div class="container d-flex justify-content-center">
                                                <button class="btn btn-danger btn-lg  btn-check-out" >Continue to checkout</button>

                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</body>
<script src="js/shoping_cart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js"
        integrity="sha512-ykZ1QQr0Jy/4ZkvKuqWn4iF3lqPZyij9iRv6sGqLRdTPkY69YX6+7wvVGmsdBbiIfN/8OdsI7HABjvEok6ZopQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</html>