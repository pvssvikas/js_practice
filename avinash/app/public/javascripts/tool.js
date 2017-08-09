$(function() {
  $('#treeview').jstree(
    {'plugins': [ 'dnd' ]}
  );
  $("#treeview").jstree("open_all");
});

 $('.drag')
            .on('mousedown', function (e) {
                return $.vakata.dnd.start(e, { 'jstree' : true, 'obj' : $(this), 'nodes' : [{ id : true, text: $(this).text() }] }, '<div id="jstree-dnd" class="jstree-default"><i class="jstree-icon jstree-er"></i>' + $(this).text() + '</div>');
            });
        $(document)
            .on('dnd_move.vakata', function (e, data) {
                var t = $(data.event.target);
                if(!t.closest('.jstree').length) {
                    if(t.closest('.drop').length) {
                        data.helper.find('.jstree-icon').removeClass('jstree-er').addClass('jstree-ok');
                    }
                    else {
                        data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');
                    }
                }
            })
            .on('dnd_stop.vakata', function (e, data) {
                var t = $(data.event.target);
                if(!t.closest('.jstree').length) {
                    if(t.closest('.drop').length) {
                        $(data.element).clone().appendTo(t.closest('.drop'));
                        // node data: 
                        // if(data.data.jstree && data.data.origin) { console.log(data.data.origin.get_node(data.element); }
                    }
                }
            });