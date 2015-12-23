console.log("script running")
$(function(){       
        // jQuery UI Dialog   
                 
        $('#dialog').dialog({
            autoOpen: false,
            width: 400,
            modal: true,
            resizable: false,
            buttons: {
                "Submit Form": function() {
                    document.testconfirmJQ.submit();
                },
                "Cancel": function() {
                    $(this).dialog("close");
                }
            }
        });
         
        $('form#testconfirmJQ').submit(function(e){
            e.preventDefault();
 
            $("p#dialog-email").html($("input#emailJQ").val());
            $('#dialog').dialog('open');
        });
});
