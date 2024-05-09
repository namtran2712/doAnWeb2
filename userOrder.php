<div id="orderTabs">
    <div class="tab">
        <button class="tablinks active" onclick="openTab(event, 'all')" data-tab="all">Tất cả</button>
        <button class="tablinks" onclick="openTab(event, 'waiting_confirm')" data-tab="waiting_confirm">Chờ xác nhận</button>
        <button class="tablinks" onclick="openTab(event, 'waiting-pickup')" data-tab="waiting_pickup">Chờ lấy hàng</button>
        <button class="tablinks" onclick="openTab(event, 'waiting_delivery')" data-tab="waiting_delivery">Chờ giao hàng</button>
        <button class="tablinks" onclick="openTab(event, 'completed')" data-tab="completed">Hoàn thành</button>
        <button class="tablinks" onclick="openTab(event, 'canceled')" data-tab="canceled">Đã hủy</button>
    </div>
</div>
<div class="tabcontent-wrapper">
    <div class="tabcontent">
        <!-- Nội dung của đơn hàng: tất cả -->
        <ul id="tabContent">
            
        </ul>
    </div>
</div>

<script src="./js/userOrder.js"></script>