<<<<<<< HEAD
pageInit(function(){
    $(document).ready(function(){
        var mform = $("#mform");
        var grid = $("#gridview").jqGrid({
	        url:"webroot/conditionMnthandler/queryConditionItmByDivCtNo",
            height: "380",
            width: "100%",
            rownumbers: true,
//            autowidth: true,
//            localFirst: true,
			colModel : [ { header: i18n['conditionMnt']['condNm'], name : "divCtNm", align: "left", width: 10 }
			, { header: i18n['conditionMnt']['condVal'], name : "condVal", align: "left", width: 35 }
			, { name : "divCtNo", hidden : true, width: 5 }
			, { name : "oid", hidden : true, width: 5 }
			]
        });
//        .addGridData([['M0新件分案','產品項目(信貸,信用卡),逾期天數(逾期天數 1 ~ 30,逾期天數 31 ~ 60),催收人員(王小一,王小二,王小三)','是']
//		   ,['回沖分案','產品項目(信貸,信用卡),逾期天數(逾期天數61 ~ 90,逾期天數 91 ~180),催收人員(王小三,王小四)','是']
//		   ,['月底分案','產品項目(信貸,信用卡),逾期天數(逾期天數181~99999),催收人員(王小五)','是']]);
        
        function openDoc(cellvalue, options, rowObject){
        	CommonAPI.formSubmit({
                url: './division/conditionMntPage',
                data: {
                    mainOid: rowObject.oid,
                    factorNo: rowObject.divCtNo
                },
                target: "_blank"//rowObject.oid
            });
        };
        
        //查詢
        $("#qry").click(function(){
            grid.jqGrid('setGridParam', {
                postData: {
                }
            });
            grid.trigger("reloadGrid");
        });
        //新增
		$("#add").click(function() {
			CommonAPI.formSubmit({
				data : {
					type : 'A'
				},
				url : './division/conditionMntPage',
				target : "_blank"
			});
		});
        
        //修改
        $("#modify").click(function(){
        	var selrow = $("#gridview").getSelRowDatas();
			if (selrow) {
				openDoc('', '', selrow);
			} else {
				CommonAPI.showErrorMessage("請先選擇要修改的資料");
			}
        });
        
        //刪除
        $("#delete").click(function(){
 			var selrow = grid.getSelRowDatas();
 			if (selrow) {
 				var _divCtNm = selrow.divCtNm;
 				$.ajax({
 					data : {
 						oid: selrow.oid
 					},
 					url : "webroot/conditionMnthandler/delete",
 					success : function() {
 						CommonAPI.showPopMessage("條件資料"+_divCtNm+"刪除完成");
 						grid.trigger("reloadGrid");
 					}
 				});
 			} else {
 				CommonAPI.showErrorMessage("請先選擇要修改的資料");
 			}
        });

    });
});
=======
pageInit(function(){
    $(document).ready(function(){
        var mform = $("#mform");
        var grid = $("#gridview").jqGrid({
	        url:"webroot/conditionMnthandler/queryConditionItmByDivCtNo",
            height: "380",
            width: "100%",
            rownumbers: true,
//            autowidth: true,
//            localFirst: true,
			colModel : [ { header: i18n['conditionMnt']['condNm'], name : "divCtNm", align: "left", width: 10 }
			, { header: i18n['conditionMnt']['condVal'], name : "condVal", align: "left", width: 35 }
			, { name : "divCtNo", hidden : true, width: 5 }
			, { name : "oid", hidden : true, width: 5 }
			]
        });
//        .addGridData([['M0新件分案','產品項目(信貸,信用卡),逾期天數(逾期天數 1 ~ 30,逾期天數 31 ~ 60),催收人員(王小一,王小二,王小三)','是']
//		   ,['回沖分案','產品項目(信貸,信用卡),逾期天數(逾期天數61 ~ 90,逾期天數 91 ~180),催收人員(王小三,王小四)','是']
//		   ,['月底分案','產品項目(信貸,信用卡),逾期天數(逾期天數181~99999),催收人員(王小五)','是']]);
        
        function openDoc(cellvalue, options, rowObject){
        	CommonAPI.formSubmit({
                url: './division/conditionMntPage',
                data: {
                    mainOid: rowObject.oid,
                    factorNo: rowObject.divCtNo
                },
                target: "_blank"//rowObject.oid
            });
        };
        
        //查詢
        $("#qry").click(function(){
            grid.jqGrid('setGridParam', {
                postData: {
                }
            });
            grid.trigger("reloadGrid");
        });
        //新增
		$("#add").click(function() {
			CommonAPI.formSubmit({
				data : {
					type : 'A'
				},
				url : './division/conditionMntPage',
				target : "_blank"
			});
		});
        
        //修改
        $("#modify").click(function(){
        	var selrow = $("#gridview").getSelRowDatas();
			if (selrow) {
				openDoc('', '', selrow);
			} else {
				CommonAPI.showErrorMessage("請先選擇要修改的資料");
			}
        });
    });
});
>>>>>>> 7198313011e70e994c816ff92740da0d1e80b8bb
