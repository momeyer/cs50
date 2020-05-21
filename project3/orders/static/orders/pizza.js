toppings = {
    'cheese': 1,
    'one topping': 2,
    'two toppings': 3,
    'three toppings': 4,
    'special': 5,
}

$(document).ready(() => {

    console.log('ready')
    // submition buttons
    var regular_pizza_button = $("#add_regular_pizza_button")
    var sicilian_pizza_button = $("#add_sicilian_pizza_button")
    var sub_button = $("#add_sub")
    var pasta_button = $("#add_pasta")
    var salad_button = $("#add_salad")
    var dinner_button = $("#add_dinner")

    // related to Pizzas only
    var modal = $("#pizza")
    var regularTop = $("#regular_toppings")
    var regularQnt = $("#regular_qnt")
    var regularSize = $("#regular_size")

    var sicilianTop = $("#sicilian_toppings")
    var sicilianQnt = $("#sicilian_num")
    var sicilianSize = $("#sicilian_size")

    var sub = $("#sub")
    var extra = $("[name='extra']")
    var subSize = $("#sub_size")
    var subQnt = $("#sub_qnt")

    var pasta = $("#pasta")
    var pastaQnt = $("#pasta_qnt")

    var salad = $("#salad")
    var saladQnt = $("#salad_qnt")

    var dinner = $("#dinner")
    var dinnerSize = $("#dinner_size")
    var dinnerQnt = $("#dinner_qnt")

    var items = $("#items_div")
    var total = $("#totalPrice")


    regular_pizza_button.click(() => {

        dataPizza = {
            "regular_toppings": regularTop.val(),
            "size": regularSize.val(),
            "num": regularQnt.val(),
            'top_opt': []

        }
        if (regularTop.val() !== 'cheese') {
            modal.modal('show')
            limitToppings(toppings[regularTop.val()])
        }
        else {
            $("#add_pizza").click()
        }


    });
    sicilian_pizza_button.click(() => {
        dataPizza = {
            "sicilian_toppings": sicilianTop.val(),
            "size": sicilianSize.val(),
            "num": sicilianQnt.val(),
            'top_opt': []

        }
        if (sicilianTop.val() !== 'cheese') {
            modal.modal('show')
            limitToppings(toppings[sicilianTop.val()])
        }
        else {
            $("#add_pizza").click()
        }
    });

    $("#add_pizza").click(() => {
        $('input:checkbox[name=top_opt]').each(function () {
            if ($(this).is(':checked')) {
                dataPizza.top_opt.push($(this).val())
                $(this).prop("checked", false);
            }
        });

        makeAjaxRequest(urlOrderPizza, dataPizza)

    })

    sub_button.click(() => {

        dataSub = {
            "sub": sub.val(),
            "size": subSize.val(),
            "num": subQnt.val(),
            'extra': extra.val()
        }
        makeAjaxRequest(urlOrderSub, dataSub)

    });

    pasta_button.click(() => {

        dataPasta = {
            "pasta": pasta.val(),
            "num": pastaQnt.val(),
        }
        makeAjaxRequest(urlOrderPasta, dataPasta)

    });


    salad_button.click(() => {

        dataSalad = {
            "salad": salad.val(),
            "num": saladQnt.val(),
        }
        makeAjaxRequest(urlOrderSalad, dataSalad)

    });

    dinner_button.click(() => {

        dataDinner = {
            "dinner": dinner.val(),
            "size": dinnerSize.val(),
            "num": dinnerQnt.val(),
        }
        makeAjaxRequest(urlOrderDinner, dataDinner)

    });

    function makeAjaxRequest(url, data) {


        $.ajax(
            {
                type: "POST",
                url: url,
                data: data,
                success: function (data) {
                    divElement = `
                    <div id="${data.itemId}_item_div">
                        <div style="margin-top: 5px;">${data.qnt}x ${data.itemName} US$ ${data.price}
                            <button class="trash" id="${data.itemId}" onclick="deleteItem(this.id)">
                                <svg class="bi bi-trash" width="1.5em " height="1em" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <button class="trash" id="${data.itemId}" onclick="EditItem(this.id)">
                                <svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="white" title="edit" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd" />
                                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>`
                    if (data.toppings !== undefined && data.toppings !== "none") {
                        divElement += `<div style="margin-left: 30px;">${data.toppings}</div>`
                    }
                    if (data.size !== undefined) {
                        divElement += `<div style="margin-left: 30px;">size: ${data.size}</div>`
                    }
                    
                    divElement += "</div>"

                    items.append(divElement)
                    modal.modal('hide')

                    total.html(data.total)
                },
                error: function () {
                    alert("error, please try again")
                }
            })
    }
});



function limitToppings(toppings) {
    $('.form-check-input').attr('disabled', false)
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

function deleteItem(id) {
    var total = $("#totalPrice")
    data = {
        "itemId": id
    }
    $.ajax(
        {
            type: "POST",
            url: urlRemoveItem,
            data: data,
            success: function (data) {
                total.html(data.total)
                $(`#${data.itemId}_item_div`).remove()
            }
        })
}



function EditItem(id, val) {
    $("#editModal").modal("show")
//     $("#content_to_edit").append(`<div class="form-row">
//     <div class="col-md-12 mb-3">
//         <input class="form-control" type="number" name="num" placeholder="qnt"
//             id="salad_qnt">
//     </div>
// </div> `)
    console.log(`"edit item: id ${id} Orders.object.get(id=${id})`)
}

