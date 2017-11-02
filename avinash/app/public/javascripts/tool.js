

$(function() {

    
    var selAppliances = new Array();
    var homeSb = new Array();
    
    
    var retData = {};
    var tempCounter = 0;
       
    retData.appliances = selAppliances;
    

//switchBoard Appliances tree
    $('#sbtree').jstree({
        'core' : {
            'data' : sbtree ,
            'check_callback' : true
        },
        'checkbox': {   
            three_state: false,
            cascade: 'up',
            wholenode : false,
            tie_selection : false
        },
        'plugins': ["checkbox" , "contextmenu"],
    }).on("check_node.jstree ", function(e, data) {
        if(selAppliances && selAppliances.length){   
            // not empty
            var txt2 = $('<i class="col-md-4 col-sm-4 col-xs-4 home_text '+ data.node.id+'"></i>').text(data.node.text);
            $(".sb_box").append(txt2);
            selAppliances.push(data.node.text);     
         } else {
            // empty
            $("#empty").hide();
            var txt2 = $('<i class="col-md-4 col-sm-4 col-xs-4 home_text '+ data.node.id+'"></i>').text(data.node.text);
            $(".sb_box").append(txt2);
            selAppliances.push(data.node.text);     
         }
      }).on("uncheck_node.jstree", function(e, data){
            //   alert("unchecked");
        if(selAppliances && selAppliances.length){   
            // not empty
            var appliance = data.node;
            $("i").remove('.'+ appliance.id);
            var index = selAppliances.indexOf(appliance.text);
            if(index > -1)
                selAppliances.splice(index, 1);
         } 
         if(selAppliances.length == 0) {
            // empty
        //    / alert("else");
        var text = 'no appliances selected';
            $("#empty").show();
            }
           });


// Home tree start
    $('#hometree').jstree({
        'core' : {
            'data' : hometree,
            'check_callback' : true
            },
        'checkbox': {
            three_state: false,
            cascade: 'up',
            wholenode : false,
            tie_selection : false
            },
        'plugins': ["checkbox" , "contextmenu" , "sort" , "unique" , "wholerow"],
        "contextmenu" : {
            "items" : function($node) {
                return { 
                    "create" : {
                        "separator_before"	: false,
                        "separator_after"	: true,
                        "label" : "create a new room ",
                        "action" : function(data) {
                            var inst = $.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                            if(obj.children == 0){
						        inst.create_node(obj, {}, "last", function (new_node) {
							        try {
								        inst.edit(new_node);
							        } catch (ex) {
								        setTimeout(function () { inst.edit(new_node); },0);
							        }
						        });
                               }
                            else {
                                
                            }
                        }
                    }
                }
            }
        }
    }).on("check_node.jstree ", function(e, data) {
     // alert(data.node.id);
     if(homeSb && homeSb.length){   
        // not empty i.e, from second check box
        tempCounter++;
        $("#roomsConfigMenu").append( $(roomTabPill({roomId:data.node.id,roomName:data.node.text,tabName:"hello" + tempCounter}) ));
        $("#roomsConfig").append( $(roomTabContent({roomId:data.node.id,roomName:data.node.text,title:"+"}) ));
        homeSb.push(data.node.text);

     } else {
        // empty i.e, executes if checking first checkbox
       
        tempCounter++;
        $("#roomsConfigMenu").append( $(roomTabPill({roomId:data.node.id,roomName:data.node.text,tabName:"hello" + tempCounter}) ));
        $("#roomsConfig").append( $(roomTabContent({roomName:data.node.text,roomId:data.node.id,title:"+"}) ));
        
        homeSb.push(data.node.text);     
     }
     }).on("uncheck_node.jstree", function(e, data){
        if(homeSb && homeSb.length){   
            // not empty
            var txt = data.node.id;
            $("#roomsConfigMenu a").remove('.'+txt);
            var index = homeSb.indexOf(data.node.text);
            if(index > -1)
                homeSb.splice(index, 1);
         } 
         if(homeSb.length == 0) {
            // empty
        var txt = 'no appliances selected';
            $("#empty").show();
            }
      });
      
      $("#sbDone").click(function() {
        var sbName = $('#sbName').val();//get switchbox name
        var roomName = $('#sbNameText').text();//get room name
        retData.sbName = roomName+sbName;//add both room name and switchboard name i.e north sb 1 etc.
        retData.roomName = roomName;
        var data = JSON.stringify(retData);//stringify the retdata
        alert(data);
        $('#retData').val(data);//attach it to the hidden input
        $("#sbForm").submit();//submit the form
      });   
     
});

function myFunction(val){
    var fwdData = {};
    var values = val;
    fwdData.values = values;
    var data = JSON.stringify(fwdData);
    $("#tagName").val(data);
    $(this).submit();
}


// switch board tree definition in "defineSb" page
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

//home tree structure in "defineHome" page
var hometree = [
    {   "text" : "Home",
        "state": { 
            "opened": true
          },
        "children" : [
                {   "text" : "Floors",
                    "state": { 
                        "opened": true
                      },
                    "children": [
                        {   "text" : "Ground Floor",
                        "state": { 
                            "opened": true
                          }, 
                        "children" : [
                            {   "text" : "Corridors",
                                "state": { 
                                    "opened": true
                                  },
                                "children" :[
                                    {   "text"  :   "North" },
                                    {   "text"  :   "East"  },
                                    {   "text"  :   "West"  },
                                    {   "text"  :   "South" }
                                ]
                            },
                        {   "text" : "Rooms",
                            "state": { 
                                "opened": true
                              },
                            "children" : [
                                {   "text" : "Room_1"   },
                                {   "text" : "Room_2"  },
                                {   "text" : "Room_3"  }
                                ]
                            },
                        ]
                    },
                ]       
            }
        ]
    },
]
