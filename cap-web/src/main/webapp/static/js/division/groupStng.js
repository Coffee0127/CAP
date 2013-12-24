pageInit(function(){
    $(document).ready(function(){
        var grid, mform = $("#mform");
        grid = $("#gridview").jqGrid({
            url: 'webroot/codetypehandler/query',
            sortname: 'groupStng',sortorder: "desc",height: 250,
            colModel: [{name: 'oid',hidden: true
            }, {header: i18n['groupStng']['groupStng'],
                name: 'groupStng',width: 110,align: "center"
            }, {header: i18n['groupStng']['codeVal'],
                name: 'codeValue',width: 80,align: "center"
            }, {header: i18n['groupStng']['codeDesc'],
                name: 'codeDesc',width: 80,align: "center"
            }, {header: i18n['groupStng']['codeOrder'],
                name: 'codeOrder',width: 80,align: "center"
            }, {header: i18n.def.lastModBy,
                name: 'updater',width: 80,align: "center"
            }, {header: i18n.def.lastModTm,
                name: 'updateTime',width: 80,align: "center"
            }],
            onSelectRow: function(){
                var ret = grid.getSelRowDatas();
                ret && mform.injectData(ret);
            }
        });
        $("#qry").click(function(){
            grid.jqGrid('setGridParam', {
                postData: {
                    locale: mform.find("#locale").val(),
                    groupStng: mform.find("#groupStng").val()
                }
            });
            grid.trigger("reloadGrid");
        });
        // 新增
        $("#add").click(function(){
            mform.validationEngine('validate') &&
            API.showConfirmMessage(i18n.def.actoin_001, function(data){
                data &&
                $.ajax({
                    url: "webroot/codetypehandler/modify",
                    data: $.extend(mform.serializeData(), {
                        type: "A"
                    }),
                    success: function(){
                        grid.trigger("reloadGrid");
                    }
                });
            });
        });
        // 修改
        $("#modify").click(function(){
            if (grid.getSelRowDatas()) {
                mform.validationEngine('validate') &&
                API.showConfirmMessage(i18n.def.actoin_001, function(data){
                    data &&
                    $.ajax({
                        url: "webroot/codetypehandler/modify",
                        data: $.extend(mform.serializeData(), {
                            type: "M"
                        }),
                        success: function(){
                            grid.trigger("reloadGrid");
                        }
                    });
                });
            }
            else {
                API.showErrorMessage(i18n.def.grid_selector);
            }
        });
        // 删除
        $("#delete").click(function(){
            if (grid.getSelRowDatas()) {
                API.showConfirmMessage(i18n.def.actoin_001, function(data){
                    data &&
                    $.ajax({
                        url: "webroot/codetypehandler/delete",
                        data: {
                            oid: $("#oid").val()
                        },
                        success: function(){
                            grid.trigger("reloadGrid");
                        }
                    });
                });
            }
            else {
                API.showErrorMessage(i18n.def.grid_selector);
            }
            
        });
        // 清除
        $("#clear").click(function(){
            mform.reset();
            grid.resetSelection();
        });
    });
});
