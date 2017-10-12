function CheckCommentLength(text) {
    var new_text = text.trim()
    if (new_text.length > 350) {
        return new_text.slice(0, 349);
    } else {
        return new_text;
    }
};

function CheckNameLength(text) {
    var new_text = text.trim()
    if (new_text.length > 36) {
        return new_text.slice(0, 35);
    } else {
        return new_text;
    }
};

function CheckLikeLength(text) {
    var new_text = text.trim()
    if (new_text.length > 34) {
        return new_text.slice(0, 33);
    } else {
        return new_text;
    }
};

function CheckExpLength(text) {
    var new_text = text.trim()
    if (new_text.length > 16) {
        return new_text.slice(0, 15);
    } else {
        return new_text;
    }
};

function CheckLoveLength(text) {
    var new_text = text.trim()
    if (new_text.length > 27) {
        return new_text.slice(0, 26);
    } else {
        return new_text;
    }
};

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

function GetData() {
    $.get("http://192.168.13.229:3000/posts/?_sort=id&_order=desc&_limit=10", function(data){
        msg = data;
        var swipercontainers = $(".swiper-slide-container");
        
        var ids = [];
        $.each(data, function(i,item){
            ids.push(item.id);
        });

        function getJSONbyID (idToLook, data) {
            for (i = 0; i < data.length; i++) {
                if (data[i].id == idToLook) {
                    return data[i]
                }
            }
        }
        
        for (i=0; i<ids.length; i++) {
            swipercontainers[i].id = ids[i];
        };

        
        for (i=0; i<ids.length; i++) {
            $("#" + ids[i]).find("span.user-name").text(CheckNameLength(getJSONbyID(ids[i], data).name));
            $("#" + ids[i]).find("span.user-comment").text(CheckCommentLength(getJSONbyID(ids[i], data).comment));
            $("#" + ids[i]).find("span.user-likes").text(CheckLikeLength(getJSONbyID(ids[i], data).likes))
            $("#" + ids[i]).find("span.user-experience").text(CheckExpLength(getJSONbyID(ids[i], data).experience));
            $("#" + ids[i]).find("span.user-love").text(CheckLoveLength(getJSONbyID(ids[i], data).most));
        }
        
        console.log(data);

   })
}

$(document).ready(function(){
    GetData();
})

$(document).ready(function(){
        $(".send-form").click(function(){  
                var usrname = CheckText(".usrname");
                var usrcomment= CheckText(".usrcomment");
                var usrradio = CheckRadio();
                var username = $("#usr").val();
                var comment = $("#comment").val();
                var likes = ($.map($("input[name='optcheckbox']:checked"), function(c){return c.value;})).join();
                var exp = $("input[name='optradio']:checked").val();
                var most = $('#most').find(':selected').val();

                if (usrname && usrcomment && usrradio) {
                    $.post("http://192.168.13.229:3000/posts",
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
        
                GetData();
                
            } 
        )
    }
)
