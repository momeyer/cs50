
toppings = {
    'cheese': 1,
    'one topping': 2,
    'two toppings': 3,
    'three toppings': 4,
    'special': 5,
}

function deleteItem(id) {
    console.log(`"delete item: id ${id} Orders.object.get(id=${id})`)
}

$(document).ready(() => {

    console.log('ready')
    var regular_pizza_button = $("#add_regular_pizza_button")
    var sicilian_pizza_button = $("#add_sicilian_pizza_button")
    var selectedPizzaDiv = $("#selected_pizza_div")

    var modal = $("#pizza")
    var regularTop = $("#regular_toppings")
    var sicilianTop = $("#sicilian_toppings")
    var sicilianQnt = $("#sicilian_num")
    var size = $("[name='size']")
    var regularQnt = $("[name='num']")

    
    regular_pizza_button.click(() => {
        if (regularTop.val() !== 'cheese') {
            selectedPizzaDiv.html(`<input type="text" name="regular_toppings" value="${regularTop.val()}"><br><br><input type="text" name="size" value="${size.val()}" ><br><br><input type="text" name="num" value="${regularQnt.val()}" ><br><br>`)
            modal.modal('show')

            limitToppings(toppings[regularTop.val()])
        }
        else {
            selectedPizzaDiv.html(`<input type="text"  name="regular_toppings" value="${regularTop.val()}"><br><br><input type="text"  name="size" value="${size.val()}" ><br><br><input type="text"  name="num" value="${regularQnt.val()}" ><br><br>`)
            $("#add_to_cart").click()
        }

    });

    sicilian_pizza_button.click(() => {
        if (sicilianTop.val() !== 'cheese') {
            selectedPizzaDiv.html(`<input type="text" name="sicilian_toppings" value="${sicilianTop.val()}"> <br><br><input type="text" name="size" value="${size.val()}" ><br><br><input type="text"  name="num" value="${sicilianQnt.val()}" ><br><br>`)
            modal.modal('show')
            limitToppings(toppings[sicilianTop.val()])
        }
        else {
            selectedPizzaDiv.html(`<input type="text"  name="regular_toppings" value="${sicilianTop.val()}"><br><br><input type="text"  name="size" value="${size.val()}" ><br><br><input type="text"  name="num" value="${sicilianQnt.val()}" ><br><br>`)
            $("#add_to_cart").click()
        }
    })

});

function limitToppings(toppings) {

    $('.form-check-input').on('change', function () {
        var noChecked = 0;
        $.each($('.form-check-input'), function () {
            if ($(this).is(':checked')) {
                noChecked++;
            }
        });
        if (noChecked >= (toppings - 1)) {
            $.each($('.form-check-input'), function () {
                if ($(this).not(':checked').length == 1) {
                    $(this).attr('disabled', 'disabled');
                }
            });
        } else {
            $('.form-check-input').removeAttr('disabled');
        };
    });
}

