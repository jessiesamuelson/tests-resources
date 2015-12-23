var elements = {
    "item1": "sort1", 
    "item2": "sort1",
    "item3": "sort1",
    "item4": "sort1",
    "item5": "sort2",
    "item6": "sort2",
    "item7": "sort2",
    "item8": "sort2",
    "item9": "sort2"
};

var $ul1 = $("#sortable1");
var $ul2 = $("#sortable2");

var fillLists = function(element_hash){
    $.each( element_hash, function( key, value ) {
      if (value === "sort1"){
        var $li = $('<li></li>').text(key).addClass("sort1");
        $ul1.append($li);
      } else {
        var $li = $('<li></li>').text(key).addClass("sort2");
        $ul2.append($li);
      }
    });
}

fillLists(elements);

$('#sortable1, #sortable2').sortable({
  connectWith: '.connected'
});

$('.sortable').sortable().bind('sortupdate', function(e, ui) {
    // ui.item.css("background", "red");
    if (ui.item.hasClass("sort2")){
        ui.item.addClass("sort1").removeClass("sort2");
    } else {
        ui.item.addClass("sort2").removeClass("sort1");
    }
    console.log(ui.elementIndex);
    /*

    This event is triggered when the user stopped sorting and the DOM position has changed.

    ui.item contains the current dragged element.
    ui.index contains the new index of the dragged element (considering only list items)
    ui.oldindex contains the old index of the dragged element (considering only list items)
    ui.elementIndex contains the new index of the dragged element (considering all items within sortable)
    ui.oldElementIndex contains the old index of the dragged element (considering all items within sortable)
    ui.startparent contains the element that the dragged item comes from
    ui.endparent contains the element that the dragged item was added to (new parent)

    */
});