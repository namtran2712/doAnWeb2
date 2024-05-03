<?php
include 'database/connect.php';

?>

<div class="authorizes">
    <div class="div-add-au">
        <input type="text" id="new-authorize" placeholder="Tên nhóm quyền mới" value="">
        <button class="add-authorize">
            <i class="fa-solid fa-plus"></i> Thêm nhóm quyền
        </button>
    </div>
    <table class="permission-table">
        <thead>
            
            <tr>
                <th rowspan="2" colspan="3">Nhóm Quyền</th>
                <th colspan="10">Các Quyền</th>
                </tr>
            <?php
                $sql="SELECT *
                FROM TASKS";
                $result=mysqli_query($connect,$sql);
                if(mysqli_num_rows($result)>0)
                {
                    echo '<tr>';
                    while($row=mysqli_fetch_assoc($result))
                    {
                           echo '<th>'.$row['TASK_NAME'].'</th>';
                    }
                    echo '<th>Chọn</th>';
                    echo '</tr>';
                }

            ?>
        </thead>
        <tbody>

        </tbody>
    </table>
</div>
<script>
    // JavaScript
    document.addEventListener("DOMContentLoaded", function() {
        // Đếm số lượng cột tiêu đề trong phần đầu của bảng
        var numOfColumns = document.querySelectorAll('.permission-table thead th').length;

        // Đặt độ rộng cho các cột tiêu đề
        var tableWidth = 100; // Độ rộng ban đầu của bảng
        var columnWidth = tableWidth / numOfColumns; // Tính độ rộng cho mỗi cột
        var thElements = document.querySelectorAll('.permission-table thead th');
        thElements.forEach(function(th) {
            th.style.width = columnWidth + '%';
        });
    });
</script>
<script src="js/authorizes.js"></script>
