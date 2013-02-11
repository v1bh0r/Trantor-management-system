var updatedesignation = function(data) {
    $.get('/designations', function(data) {
        $('#change_table').empty();
        $('#change_table').html(data);
        configureTable($('#designation_table'));
    }).error(function(jqXHR, textStatus, errorThrown) {
        window.location.href = "/dashboard"
    });

}

function resetdis()
{
        event.preventDefault();
        $('#designation_name').val('');
        $('.des_create').attr('disabled',false);
        $('.des_update').attr('disabled',true);
        $('.message').empty()

}

$(document).ready(function() {
    configureTable($('#designation_table'));
    $('.des_update').attr('disabled',true);
    $('body').delegate('.destination_update','click', function(event){
        event.preventDefault();
        id = $(this).attr('data');
        $('#designation_name').val($('#name_'+id).text());
        $('.des_create').attr('disabled',true);
        $('.des_update').attr('disabled',false);
         $('#designation_name').attr('data',id)
    });
    $('body').delegate('.destination_delete','click', function(event){
        event.preventDefault();
        id = $(this).attr('data');
       data  = {
             '_method': 'delete'
        }

        $.ajax({
            url: '/designations/'+id,
            dataType : 'json',
            type:'delete',
            data: data,
            success: function(data, textStatus, jqXHR) {
                if(data.valid) {
                    updatedesignation(data);
                    resetdis();
                } else {
                    var errorText = data.errors;
                    var errorString = "";
                    for (var key in errorText)
                    {
                        errorString += key+" " +errorText[key];
                    }
                    $('.message').empty();
                    $('.message').append(errorString)

                }
            },
            error : function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 403) {
                    window.location.href = "/dashboard";
                }else{

                }
            }

        });

    });
   $('.des_reset').on('click', function(event){
       resetdis();
   });
    $('.des_create').on('click', function(event){
        event.preventDefault();
        name =  $('#designation_name').val();
        data  = {
            'designation[name]' : name
        }

        $.ajax({
            url: '/designations',
            dataType : 'json',
            type:'post',
            data: data,
            success: function(data, textStatus, jqXHR) {
                if(data.valid) {
                    updatedesignation(data);
                    resetdis();
                } else {
                    var errorText = data.errors;
                    var errorString = "";
                    for (var key in errorText)
                    {
                        errorString += key+" " +errorText[key];
                    }
                    $('.message').empty();
                    $('.message').append(errorString)

                }
            },
            error : function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 403) {
                    window.location.href = "/dashboard";
                }else{

                }
            }

        });
    });

    $('.des_update').on('click', function(event){
        event.preventDefault();
        id = $('#designation_name').attr('data')
        name =  $('#designation_name').val();
        data  = {
            'designation[name]' : name,
            '_method': 'put'
        }

        $.ajax({
            url: '/designations/'+id,
            dataType : 'json',
            type:'post',
            data: data,
            success: function(data, textStatus, jqXHR) {
                if(data.valid) {
                    updatedesignation(data);
                    resetdis();
                } else {
                    var errorText = data.errors;
                    var errorString = "";
                    for (var key in errorText)
                    {
                        errorString += key+" " +errorText[key];
                    }
                    $('.message').empty();
                    $('.message').append(errorString)

                }
            },
            error : function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 403) {
                    window.location.href = "/dashboard";
                }else{

                }
            }

        });
    });





} );





