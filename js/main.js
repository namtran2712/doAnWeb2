var cardHodler = $("#productBestSeller")
var card = `
        <div class="card mx-2 " style="width: 300px; ">
            <img src="img/img-81-1.png" class="card-img-top img-fluid" alt="...">
            <div class="card-body ">
                <h5 class="card-title text-center">thuoc tri tieu duong</h5>
                <p class="card-text text-center">
                130000000$
                </p>
            </div>
        </div>
`
function addCard() {
    for (var i = 0; i < 10; i++) {
        cardHodler.append(card);
    }
}

addCard();
