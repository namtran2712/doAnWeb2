<?php

    require ("./connect.php");

    function selectAll ($connect) {
        $sql = "SELECT *
        FROM CATEGORY";
        $result = mysqli_query($connect,$sql);
        if (mysqli_num_rows($result) > 0) {
            $category = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $category[] = $row;
            }
            echo json_encode($category);
        }
    }

    if ($_GET["type"]==1) {
        selectAll($connect);
    }
?>