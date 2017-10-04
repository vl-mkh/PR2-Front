function CheckText(reqclass) {
    if ($.trim($(reqclass).val()).length == 0) {
        $(reqclass).addClass("highlight");
        return false;
    }
    else {
        $(reqclass).removeClass("highlight");
        return true;
    }
};

function CheckRadio() {
    if ($("input[name='optradio']:checked").length == 0) {
        $(".radcheck").addClass("highlight");
        return false;
    }
    else {
        $(".radcheck").removeClass("highlight");
        return true;
    }
};

$(document).ready(function(){
        $(".send-form").click(function(){  
                var usrname = CheckText(".usrname");
                var usrcomment= CheckText(".usrcomment");
                var usrradio = CheckRadio();
                var username = $("#usr").val();
                var comment = $("#comment").val();
                var likes = $.map($("input[name='optcheckbox']:checked"), function(c){return c.value;});
                var exp = $("input[name='optradio']:checked").val();
                var most = $('#most').find(':selected').val();

                if (usrname && usrcomment && usrradio) {
                    $.post("http://localhost:3000/posts",
                        {
                            "name": username,
                            "comment": comment,
                            "likes": likes,
                            "experience": exp,
                            "most": most
                        }
                    );

                    $("#usr").val("");
                    $("#comment").val("");
                    $("input[name='optcheckbox']").prop('checked', false);
                    $("input[name='optradio']").prop('checked', false);
                }
            }        
        )
    }
)

