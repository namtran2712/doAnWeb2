<?php

    require ("./connect.php");

    function selectAll ($connect) {
        $sql = "SELECT *
        FROM MATERIAL";
        $result = mysqli_query($connect,$sql);
        if (mysqli_num_rows($result) > 0) {
            $material = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $material[] = $row;
            }
            echo json_encode($material);
        }
    }
    function selectById ($connect,$id) {
        $sql = "SELECT *
        FROM MATERIAL 
        WHERE ID_MATERIAL=$id";
        $result = mysqli_query($connect,$sql);
        if (mysqli_num_rows($result) > 0) {
            $material = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $material[] = $row;
            }
            echo json_encode($material);
        }
    }

    if ($_GET["type"]==1) {
        selectAll($connect);
    }
    elseif($_GET["type"]==2)
    {
        $id=$_GET['id'];
        selectById($connect,$id);
    }
?>