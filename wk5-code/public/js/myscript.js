console.log(dogs);

$('#delete').on('click', function () {
    var userId = $(this).attr('data-id');
    console.log("Hi");
    /* $.ajax({
         method: "POST",
         url: "/users/delete",
         data: {
             "userId": userId
         },
         success: function (result) {

             location.href('/');

         }
     })*/

    $.ajax({
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            'userId': userId
        }),


        success: function (response) {

            if (response === 'error') {

                alert('crap!');

            } else if (response === 'success') {
              //  window.location = "/";
                alert('worked fine!');

            }

        }


    })
});