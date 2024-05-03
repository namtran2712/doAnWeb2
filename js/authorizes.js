$(document).ready(function () {

    
    loadAuthories()
    
    function loadAuthories()
    {
        $.ajax({
            type: "GET",
            url: "./database/authoriesDao.php?type=2",
            dataType: "json",
            success: function (response) {
                $(".permission-table tbody").empty();

               response.forEach(element => {
                    $.ajax({
                        type: "GET",
                        url: "./database/authoriesDao.php?type=9",
                        dataType: "json",
                        success: function (data) {
                            var item=
                            `
                               <tr>
                                    <td colspan="3">${element['AUTHORIZE_NAME']}</td>;
                                    <td><input type="checkbox" class="authorize-${element['ID_AUTHORIZE']}" id="${element['ID_AUTHORIZE']}-${data[0]['ID_TASK']}"name="product-permission" ></td>;
                                    <td><input type="checkbox" class="authorize-${element['ID_AUTHORIZE']}" id="${element['ID_AUTHORIZE']}-${data[1]['ID_TASK']}"name="customer-permission"></td>;
                                    <td><input type="checkbox" class="authorize-${element['ID_AUTHORIZE']}" id="${element['ID_AUTHORIZE']}-${data[2]['ID_TASK']}"name="staff-permission"></td>;
                                    <td><input type="checkbox" class="authorize-${element['ID_AUTHORIZE']}" id="${element['ID_AUTHORIZE']}-${data[3]['ID_TASK']}"name="account-permission"></td>;
                                    <td><input type="checkbox" class="authorize-${element['ID_AUTHORIZE']}" id="${element['ID_AUTHORIZE']}-${data[4]['ID_TASK']}"name="bill-permission"></td>;
                                    <td><input type="checkbox" class="authorize-${element['ID_AUTHORIZE']}" id="${element['ID_AUTHORIZE']}-${data[5]['ID_TASK']}"name="receipt-permission"></td>;
                                    <td><input type="checkbox" class="authorize-${element['ID_AUTHORIZE']}" id="${element['ID_AUTHORIZE']}-${data[6]['ID_TASK']}"name="nhapHang-permission"></td>;
                                    <td><input type="checkbox" class="authorize-${element['ID_AUTHORIZE']}" id="${element['ID_AUTHORIZE']}-${data[7]['ID_TASK']}"name="statistic-permission"></td>;
                                    <td><input type="checkbox" class="authorize-${element['ID_AUTHORIZE']}" id="${element['ID_AUTHORIZE']}-${data[8]['ID_TASK']}"name="decentralization-permission"></td>;
                                    <td><div class="btn-authorizes"><button class="btn-update-au" data-id=${element['ID_AUTHORIZE']}><i class="fa-solid fa-rotate"></i></button><button class="btn-delete-au" data-id=${element['ID_AUTHORIZE']}><i class="fa-solid fa-trash"></i></button></div></td>;
                                </tr>;
                            `
                            $(".permission-table tbody").append(item);
                            setTask(element['ID_AUTHORIZE'])

                            $(".btn-update-au").off('click')
                            $(".btn-update-au").click(function (e) { 
                                e.preventDefault();
                                var id=$(this).data('id');
                                $.ajax({
                                    type: "GET",
                                    url: "./database/authoriesDao.php?type=6&id="+id,
                                    dataType: "text",
                                    success: function (response) {
                                        console.log(response)
                                        $('.authorize-'+id).each(function() {
                                            if($(this).is(':checked'))
                                            {
                                                var Arrayid=($(this).attr('id')).split("-")
                                                $.ajax({
                                                    type: "GET",
                                                    url: "./database/authoriesDao.php?type=7&idAu="+Arrayid[0]+"&idTask="+Arrayid[1],
                                                    dataType: "text",
                                                    success: function (response) {
                                                        Swal.fire("Cập nhật nhóm quyền thành công!", "", "success");
                                                    }
                                                });
                                            }
                                            
                                        });
                                    }
                                });
                            });
                            $(".btn-delete-au").off('click')
                            $(".btn-delete-au").click(function (e) { 
                                e.preventDefault();
                                var id=$(this).data('id');
                                Swal.fire({
                                    title: "Bạn chắc chắn muốn xóa?",
                                    showDenyButton: true,
                                    showCancelButton: false,
                                    confirmButtonText: "Xóa",
                                    denyButtonText: `Hủy`
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                            $.ajax({
                                                type: "GET",
                                                url: "./database/authoriesDao.php?type=8&id="+id,
                                                dataType: "html",
                                                success: function (data) {
                                                    loadAuthories()
                                                }
                                            });
                                            Swal.fire("Đã xóa thành công!", "", "success");
                                    }
                                });
                            });
                        }
                    });
               });
            }
        });
    }

    function setTask(ID_AUTHORIZE)
    {
        $.ajax({
            type: "GET",
            url: "./database/authoriesDao.php?type=3&id="+ID_AUTHORIZE,
            dataType: "json",
            success: function (pttask) {
                pttask.forEach(value => {
                    $('#'+ID_AUTHORIZE+'-'+value['ID_TASK']).prop('checked', true);
                });
            }
        });
    }
    $(".add-authorize").click(function (e) { 
        e.preventDefault();
        if($("#new-authorize").val()=="")
        {
            Swal.fire({
                title: "Vui lòng nhập tên nhóm quyền !!!",
                text: "",
                icon: "error"
            });
        }
        else
        {
            $.ajax({
                type: "GET",
                url: "./database/authoriesDao.php?type=5&name="+$("#new-authorize").val(),
                dataType: "text",
                success: function (response) {
                    if(response==0)
                    {
                        Swal.fire({
                            title: "Tên nhóm quyền đã tồn tại!!!",
                            text: "",
                            icon: "error"
                        });
                    }
                    else
                    {
                        $.ajax({
                            type: "GET",
                            url: "./database/authoriesDao.php?type=4&name="+$("#new-authorize").val(),
                            dataType: "text",
                            success: function (response) {
                                loadAuthories()
                            }
                        });
                    }
                }
            });
        }
    });

});