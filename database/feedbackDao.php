<?php

    require ("./connect.php");

    function insertFeedback($connect, $idBill, $content, $star) {
        session_start();
        if (isset($_SESSION["accountCurrent"])) {
            $idAccount = $_SESSION["accountCurrent"]["idAccount"];
            $sql = "INSERT INTO FEEDBACKS (ID_BILL, CONTENT, STAR, ID_ACCOUNT)
            VALUES ($idBill, '$content', $star, $idAccount)";
            if (mysqli_query($connect, $sql)) {
                require ("./billDao.php");
                updateStatusBill($connect, $idBill);
                return 1;
            }
        }
    }

    function getCountFeedback ($connect, $idProduct) {
        $sql = "SELECT COUNT(*)
        FROM feedbacks JOIN particular_bills
        ON feedbacks.ID_BILL = particular_bills.ID_BILL
        WHERE particular_bills.ID_PRODUCT = $idProduct";
        $result = mysqli_query($connect,$sql);
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                return $row["COUNT(*)"];
            }
        }
        return 0;
    }

    function getFeedbackByBill ($connect, $idBill) {
        $sql = "SELECT *
        FROM FEEDBACKS JOIN BILLS
        ON FEEDBACKS.ID_BILL = BILLS.ID_BILL
        WHERE BILLS.ID_BILL = $idBill";
        $result = mysqli_query($connect, $sql);
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                return json_encode($row);
            }
        }
    }

    if ($_GET["type"] == 1) {
        echo insertFeedback($connect, $_POST["id"], $_POST["content"], $_POST["star"]);
    }
    else if ($_GET["type"] == 2) {
        echo getFeedbackByBill($connect, $_GET["id"]);
    }
?>