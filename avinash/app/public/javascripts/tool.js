$(function() {
    var list = new Array();
    $('#sbtree').jstree({
        'core' : {
            'data' : sbtree },
        'checkbox': {
            three_state: false,
            cascade: 'up',
            wholenode : false,
            tie_selection : false
        },
        'plugins': ["checkbox"],
    }).on("check_node.jstree ", function(e, data) {
        if(list && list.length){   
            // not empty
            var txt2 = $('<i class="col-md-4 col-sm-4 home_text '+ data.node.id+'"></i>').text(data.node.text);
            $(".sb_box").append(txt2);
            list.push(data.node);     
         } else {
            // empty
            $("#empty").hide();
            var txt2 = $('<i class="col-md-4 col-sm-4 home_text '+ data.node.id+'"></i>').text(data.node.text);
            $(".sb_box").append(txt2);
            list.push(data.node);     
         }
      }).on("uncheck_node.jstree", function(e, data){
            //   alert("unchecked");
        if(list && list.length){   
            // not empty
            var txt = data.node;
            $("i").remove('.'+txt.id);
            var index = list.indexOf(txt.id);
            list.splice(index, 1);
         } 
         if(list.length == 0) {
            // empty
        //    / alert("else");
        var txt = 'no appliances selected';
            $("#empty").show();
            }
           });
    $('#hometree').jstree({
        'core' : {
            'data' : hometree},
        'checkbox': {
            three_state: false,
            cascade: 'up',
            wholenode : false,
            tie_selection : false
        },
        'plugins': ["checkbox"]
    }).on("check_node.jstree ", function(e, data) {
     // alert(data.node.id);
      var txt2 = $('<i class="col-md-4 col-sm-4 home_text" name= '+ data.node.id +'"></i>').text(data.node.text);
      $(".home_box").append(txt2); 
     }).on("uncheck_node.jstree", function(e, data){
        var txt = data.node.id;
          $("i").remove('.'+txt);
      });
      $("#sbDone").click(function() {
        if($('#sbName').val() == ''){
            $("#warning").empty().append("cannot be left empty");
        }
        if($('#sbName').val() !== ''){
            window.location = "/defineHome";
        }
      });      
});


 var sbtree = [
    {   "text" : "Switch Board Definitions",
        "state": { "opened": true, "disabled" : true  },
        "a_attr": {"class":"no_checkbox"}, "children" : [
            {   "text" : "Home Appliances",
                "state": { "opened": true, "disabled" : true  },
                "a_attr": {"class":"no_checkbox"}, "children" : [
               {    "text" : "General Appliances", 
                    "state": { "opened": true, "disabled" : true },
                    "a_attr": {"class":"no_checkbox"},"children" : [
                    {   "text" : "Fan"  },
                    {    "text" : "Light"   },
                    {    "text" : "AC"  },
                    {    "text" : "Cooler"  }
                ]},       
                {   "text" : "Kitchen",
                    "state": { "opened": true, "disabled" : true  },
                    "a_attr": {"class":"no_checkbox"}, "children" : [
                    {   "text" : "Fridge"   },
                    {   "text" : "Grinder"  },
                    {   "text" : "Exhaust"  }
                ]},
                {   "text" : "Entertainment",
                    "state": { "opened": true, "disabled" : true  },
                    "a_attr": {"class":"no_checkbox"}, "children" : [
                    {   "text" : "TV"   },
                    {   "text" : "Music System" }
                ]}
            ]},
            { "text" : "Power Sockets" }
    ]},
]

var hometree = [
    {   "text" : "Home",
        "state": { "opened": true, "disabled" : true  },
        "a_attr": {"class":"no_checkbox"}, "children" : [
            {   "text" : "Floors",
                "state": { "opened": true, "disabled" : true  },
                "a_attr": {"class":"no_checkbox"},},       
            {   "text" : "Ground Floor",
                "state": { "opened": true, "disabled" : true  },
                "a_attr": {"class":"no_checkbox"}, "children" : [
                    {   "text" : "Corridors",
                        "state": { "opened": true, "disabled" : true  },
                        "a_attr": {"class":"no_checkbox"}, "children" :[
                        {   "text"  :   "North" },
                        {   "text"  :   "East"  },
                        {   "text"  :   "West"  },
                        {   "text"  :   "South" }
                    ]},
                    {   "text" : "Rooms",
                        "state": { "opened": true, "disabled" : true  },
                        "a_attr": {"class":"no_checkbox"}, "children" : [
                        {   "text" : "Rooms 1"   },
                        {   "text" : "Rooms 2"  },
                        {   "text" : "Rooms 3"  }
                    ]},
            ]},
    ]},
]
