/**
 * Created by santiago on 25/5/16.
 */
if (typeof jQuery === "undefined") {
    throw new Error("Live Data requires jQuery");
}

$.LiveData = {};

$.LiveData.serverConfig = {
    'server' : '10.0.0.2',
    'port'   : '5140',
    'notifications_namespace' : 'notificaciones'
};

$.LiveData.server = {
    getIp                    : function(){ return $.LiveData.serverConfig.server},
    getPort                  : function(){ return $.LiveData.serverConfig.port},
    getNotificationNamespace : function(){ return $.LiveData.serverConfig.notifications_namespace},
    getBaseWs                : function(){ return this.getIp()+':'+this.getPort()},
    getWsNotifications       : function(){
        return this.getBaseWs()+'/'+this.getNotificationNamespace();
    }
}

$.LiveData.notifications = {
    sistema       : 0,
    personal      : 0,
    setSistema    : function($cant){ this.sistema    = $cant},
    setPersonal   : function($cant){ this.personal   = $cant},
    init          : function($sist,$pers){
        this.setSistema($sist);
        this.setPersonal($pers);
    },
    addSistema    : function(){
        this.sistema++;
        return this.sistema;
    },
    addPersonal   : function(){
        this.personal++;
        return this.personal;
    }
}

//Codigo ejecutado al Inicio, común a todas las ventanas.
$(document).ready(function () {

    var server = $.LiveData.server;

    var websocket_connection = server.getWsNotifications();

    var not = io(websocket_connection);

    not.on('sistema',function(data){
        console.log('sistema');
        console.log(data);
    });

    not.on('grupal_{{ equipo.id }}',function(data){
        console.log('equipo');
        console.log(data);
    });

    not.on('personal_{{ app.user.persona.id }}',function(data){
        console.log('personal');
        console.log(data);
    });


    /**
     * Funciones relacionadas con los modales
     *
     */
    $('.delete-obj').click(function(){
        $('#modal-delete-obj').modal('show',this);
        return false;
    });

    $('#modal-delete-obj').on('show.bs.modal', function(e) {

        $(this).find('.btn-confirm').click(function(){
            
            var objId = $(e.relatedTarget).data('id');

            var actionString = $('.delete-obj-form form').attr('action');

            var actionString = actionString.replace(/__obj_id__/g, objId);

            $('.delete-obj-form form').attr('action',actionString);

            $('.delete-obj-form form').submit();
        });
        
    });
});
