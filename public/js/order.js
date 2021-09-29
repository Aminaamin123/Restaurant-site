
function printOrder(orders) {
    $("#in-cart").children().remove();
    for (o in orders){ //for each order in list, add it to html
      grade = orders[o].extra
      title = orders[o].title
      price = orders[o].price

      order = `<li id=${price}> ${title}  <img src="img/remove.png" alt="remove" class="delete-order"  > </li>`
      $("#in-cart").append(order);
    }
  }
  
  function loadOrder() {
    let jsonOrder= localStorage.getItem("order"); //get orders from localstorage
    let order = JSON.parse(jsonOrder); // changing the string into a list
    return order;
  }
  
  
  $(".add-btn").on("click", function(e) {
    var pos = $(this).parent().find('.label').text();
    var price = $(this).parent().find('span').text();
    alert("You added " +pos.toLowerCase() + " to the cart!")
    order = {"title": pos, "extra": "?", "price": price}
    localOrder = JSON.parse(localStorage.getItem("order"))
    if (localOrder.length == 0){
      $(".checkout-btn").css("display", "block")
      $(".p-amount").css("display", "block")
    }
    localOrder.push(order) // saving a new order last in the list
    localStorage.setItem("order", JSON.stringify(localOrder)); // adding new list to localstorage in a string

    var old_price = JSON.parse(localStorage.getItem("price"))
    price = parseInt(price) + old_price
    localStorage.setItem("price", JSON.stringify(price));

    printOrder(localOrder);
    $(".p-amount").parent().find("span").text(price)
    // print price

  });
  
  
  $("#in-cart").on("click", ".delete-order", function (e) {
    deleteOrder= $(this).parent("li"); //finds parent elements to the image we clicked
    order = JSON.parse(localStorage.getItem("order"));
    order.splice($(deleteOrder).index(), 1); //deleting the element
    localStorage.setItem("order", JSON.stringify(order));

    old_price = parseInt(JSON.parse(localStorage.getItem("price")))
    var price = $(this).parent("li").attr('id')
    price = old_price - parseInt(price) 
    localStorage.setItem("price", JSON.stringify(price));
    $(".p-amount").parent().find("span").text(price)

    printOrder(order);
  
    if (order.length == 0){
      //if empty remove the order btn
      $(".checkout-btn").css("display", "none")
      $(".p-amount").css("display", "none")
    }
  });
  
  // Print out all order from list when page reload
  $(document).ready(function () {
  
    if (loadOrder() == null){
        localStorage.setItem("order", "[]");
    }else{
        const order = loadOrder();
        printOrder(order);
        if (order.length > 0){
            $(".checkout-btn").css("display", "block")
            $(".p-amount").css("display", "block")
        }
    }
    if (localStorage.getItem("price") == null){
      localStorage.setItem("price", 0);
    }else {
      $(".p-amount").parent().find("span").text(localStorage.getItem("price"))
    }
  
  });



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  const d = new Date()
  if (23 > d.getHours() && d.getHours() > 9 ){
    modal.style.display = "block";
    localOrder = JSON.parse(localStorage.getItem("order"))
    $("#display-order").children().remove();
    for (o in localOrder){ //for each order in list, add it to html
        grade = localOrder[o].extra
        title = localOrder[o].title
        order = `<li> ${title} </li>`
        $("#display-order").append(order);
    }
  }
  else{
    alert("We are closed at the moment see opening hours in the bottom of the page!")
  }

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$("#home-delivery").on("click", function(e) {
    if(this.checked) {
        $(".pick-up-info").css("display", "block")
    }
});

$("#pick-up").on("click", function(e) {
    if(this.checked) {
        $(".pick-up-info").css("display", "none")
    }
});

$("#eat-at-place").on("click", function(e) {
    if(this.checked) {
        $(".pick-up-info").css("display", "none")
    }
});

$(".order-nav-item").on("click", function(e) {
    $(".order-nav-item").css("background-color", "rgb(42, 74, 66)")
    $(this).css("background-color", "rgb(82, 81, 81)")
});


$("#new-order").on("submit", function (e) {

  e.preventDefault(); 
  let name = $("#name").val();
  let email = $("#email").val();
  let phone = $("#number").val();
  let adress = $("#adress").val();
  let floorNr = $("#floor-number").val();
  let delivery = ""
  if($('#eat-at-place').is(':checked')) { delivery = "Eat at resturant" }
  else if($('#pick-up').is(':checked')) { delivery = "Pick up"}
  else if($('#home-delivery').is(':checked')) { delivery = "Home delvery"}
  
  if (name.length == 0 || email.length == 0 || phone.length < 8 || delivery == "") {
      alert("You must fill in all fields");
      return
    }else{  
      orderFunction(name, email, phone, delivery, adress, floorNr)
      modal.style.display = "none";
      $("#new-order").trigger("reset")
      //JSON.parse(localStorage.getItem("movies"))
    }
    

});


function orderFunction(name, email, phone, delivery, adress, floorNr) {

  localOrder = JSON.parse(localStorage.getItem("order"))

  const d = new Date()
  var id = d + name 
  database.ref('/orders/' + id).set({
    name: name,
    time: d.toLocaleString(),
    order: localOrder,
    done: false,
    email: email,
    phone: phone,
    delivery: delivery,
    adress: adress,
    floor: floorNr
});
}
