(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c061808"],{"081c":function(e,t,r){},2965:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"mainPanel"},[r("el-form",{ref:"orderForm",attrs:{model:e.orderForm,"label-width":"120px",rules:e.orderFormRules}},[r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"客户名称：",prop:"customerName"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.orderForm.customerName,callback:function(t){e.$set(e.orderForm,"customerName",t)},expression:"orderForm.customerName"}})],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系人：",prop:"contactName"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.orderForm.contactName,callback:function(t){e.$set(e.orderForm,"contactName",t)},expression:"orderForm.contactName"}})],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"联系电话：",prop:"contactPhone"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.orderForm.contactPhone,callback:function(t){e.$set(e.orderForm,"contactPhone",t)},expression:"orderForm.contactPhone"}})],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"服务地址：",prop:"address"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.orderForm.address,callback:function(t){e.$set(e.orderForm,"address",t)},expression:"orderForm.address"}})],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"详细地址："}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.orderForm.detailAdd,callback:function(t){e.$set(e.orderForm,"detailAdd",t)},expression:"orderForm.detailAdd"}})],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"工单标题：",prop:"title"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.orderForm.title,callback:function(t){e.$set(e.orderForm,"title",t)},expression:"orderForm.title"}})],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"服务项目：",prop:"category"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.orderForm.category,callback:function(t){e.$set(e.orderForm,"category",t)},expression:"orderForm.category"}})],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"选择设备：",prop:"deviceId"}},[r("el-select",{staticStyle:{width:"100%"},model:{value:e.orderForm.deviceId,callback:function(t){e.$set(e.orderForm,"deviceId",t)},expression:"orderForm.deviceId"}},e._l(e.deviceList,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"预约时间：",prop:"appointsTime"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"选择日期时间"},model:{value:e.orderForm.appointsTime,callback:function(t){e.$set(e.orderForm,"appointsTime",t)},expression:"orderForm.appointsTime"}})],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"工单优先级：",prop:"priority"}},[r("el-radio-group",{model:{value:e.orderForm.priority,callback:function(t){e.$set(e.orderForm,"priority",t)},expression:"orderForm.priority"}},[r("el-radio",{attrs:{label:"一般"}},[e._v("一般")]),r("el-radio",{attrs:{label:"紧急"}},[e._v("紧急")]),r("el-radio",{attrs:{label:"非常紧急"}},[e._v("非常紧急")])],1)],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"详细描述：",prop:"content"}},[r("el-input",{attrs:{placeholder:"请输入内容",type:"textarea"},model:{value:e.orderForm.content,callback:function(t){e.$set(e.orderForm,"content",t)},expression:"orderForm.content"}})],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"图片描述："}},[r("ImageUpload",{on:{change:function(t){e.orderForm.imgs=t}}})],1)],1)],1),r("el-row",{attrs:{type:"flex",align:"middle"}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"工单标签："}},[r("el-checkbox-group",{model:{value:e.orderForm.label,callback:function(t){e.$set(e.orderForm,"label",t)},expression:"orderForm.label"}},[r("el-checkbox",{attrs:{label:"厦门"}}),r("el-checkbox",{attrs:{label:"已结款"}}),r("el-checkbox",{attrs:{label:"未结款"}}),r("el-checkbox",{attrs:{label:"已收预付款"}}),r("el-checkbox",{attrs:{label:"已付款"}})],1)],1)],1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("立即创建")]),r("el-button",[e._v("取消")])],1)],1)],1)},i=[],a=r("1da1"),l=r("5530"),s=(r("96cf"),r("b0c0"),r("4de4"),r("159b"),r("ac1f"),r("5319"),r("d3b7"),r("25f0"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-upload",{ref:"upload",class:{readonly:e.readonly,readonly1:e.fileList.length>=e.limit},attrs:{"list-type":e.listType,action:"",accept:"image/*",multiple:"","file-list":e.fileList,"http-request":e.upload,"before-upload":e.beforeUpload,"on-preview":e.handlePreview,"on-remove":e.handleRemove}},["text"===e.listType?[e._t("default",(function(){return[r("el-button",{attrs:{type:"primary"}},[e._v("图片上传")])]}))]:e._e(),"picture-card"===e.listType?[r("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})]:e._e()],2),r("el-progress",{directives:[{name:"show",rawName:"v-show",value:e.isProgressShow,expression:"isProgressShow"}],attrs:{percentage:e.percentage}}),e.dialogVisible?r("el-image-viewer",{attrs:{"initial-index":e.initialIndex,"on-close":e.closeViewer,"url-list":e.previewList,"z-index":1e4}}):e._e(),r("el-dialog",{staticClass:"cropper-dialog",attrs:{title:"图片裁剪",top:"5%",visible:e.cropperShow},on:{"update:visible":function(t){e.cropperShow=t},close:e.handleClose}},[r("div",{staticClass:"cropper-content"},[r("div",{staticClass:"cropper"},[r("vueCropper",{ref:"cropper",attrs:{img:e.clipperOption.img,"output-size":e.clipperOption.size,"output-type":e.clipperOption.outputType,info:!0,"auto-crop":e.clipperOption.autoCrop,"auto-crop-width":e.clipperOption.autoCropWidth,"auto-crop-height":e.clipperOption.autoCropHeight,"fixed-box":e.clipperOption.fixedBox}})],1)]),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small"},on:{click:function(t){e.cropperShow=!1}}},[e._v("关闭")]),r("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.handleCropper}},[e._v("确定")])],1)])],1)}),n=[],c=(r("a9e3"),r("c740"),r("a434"),r("3ca3"),r("ddb0"),r("2b3d"),r("9861"),r("99af"),r("fe88")),d=r("2f62"),p=r("62b0"),u=r("7e79"),m={components:{VueCropper:u["VueCropper"]},props:{listType:{type:String,default:"text"},isClipper:{type:Boolean,default:!1},limit:{type:Number,default:9999},defaultImagesFileData:{type:Array,default:function(e){return[]}},readonly:{type:Boolean,default:!1}},data:function(){return{fileList:[],fileData:[],dialogVisible:!1,initialIndex:0,previewList:[],cropperShow:!1,clipperOption:{img:"",outputSize:1,outputType:"png",autoCrop:!0,autoCropWidth:375,autoCropHeight:375,fixedBox:!0},fileOption:{},percentage:0,isProgressShow:!1}},computed:Object(l["a"])({},Object(d["b"])(["baseUrl"])),watch:{defaultImagesFileData:function(e,t){this.dataInit(e),this.$emit("change",this.fileData)}},mounted:function(){this.dataInit(this.defaultImagesFileData)},methods:{dataInit:function(e){var t=this,r=[],o=JSON.parse(JSON.stringify(e));o.forEach((function(e){e.url=t.baseUrl+e.fileUrl,r.push(e.url)})),this.fileList=o||[],this.fileData=JSON.parse(JSON.stringify(e)),this.previewList=r},beforeUpload:function(e){if(this.fileList.length>=this.limit)return this.$message.error("超出最大上传数量"),this.fileList.pop(),void this.previewList.pop()},upload:function(e){var t=this;if(!(this.fileList.length>=this.limit)){var r=e.file.size/1024,o=e.file;r>500?(this.$refs.upload.uploadFiles.pop(),this.imageCompress(o).then((function(r){t.isClipper?t.imageClipper(r):t.handleUpload(e)}))):(this.$refs.upload.uploadFiles.pop(),this.isClipper?this.imageClipper(o):this.handleUpload(e))}},handleUpload:function(e){var t=this;this.fileUpload(e.file).then((function(r){t.fileList.push(r),t.previewList.push(Object(c["a"])(e.file)),t.$emit("change",t.fileData)}))},imageClipper:function(e){this.cropperShow=!0;var t=Object(c["a"])(e);this.clipperOption.img=t,this.fileOption={type:e.type,name:e.name}},imageCompress:function(e){return new Promise((function(t,r){new p["a"](e,{mimeType:"image/jpeg",quality:.3,success:function(e){t(e)},error:function(e){r(e),console.log(e)}})}))},fileUpload:function(e){var t=this;return new Promise((function(r,o){var i=new FileReader;i.readAsDataURL(e),i.onload=function(){var o={fileSize:e.size,fileUrl:i.result,name:e.name,url:Object(c["a"])(e)};t.fileData.push(o),r(o)}}))},handleRemove:function(e,t){var r=this.fileList.findIndex((function(t){return t.fileUrl===e.fileUrl}));-1!==r&&(this.fileList.splice(r,1),this.previewList.splice(r,1),this.fileData.splice(r,1),this.$emit("change",this.fileData))},handleCropper:function(){var e=this;this.$refs.cropper.getCropBlob((function(t){var r=window.URL.createObjectURL(t),o=new File([t],e.fileOption.name,{type:e.fileOption.type});o.url=r,e.fileUpload(o).then((function(t){e.previewList.push(r),e.fileList.push(t),e.fileList.forEach((function(t){t.name=t.oldFileName,t.url="".concat(e.baseUrl).concat(t.fileUrl)})),e.cropperShow=!1,e.$emit("change",e.fileData)}))}))},handleClose:function(){this.fileData.length||(this.fileList.pop(),this.previewList.pop())},handlePreview:function(e){for(var t=0;t<this.fileList.length;t++)if(this.fileList[t].url===e.url){this.initialIndex=t;break}this.dialogVisible=!0},closeViewer:function(){this.dialogVisible=!1}}},f=m,h=(r("aa48"),r("2877")),b=Object(h["a"])(f,s,n,!1,null,"6c5bd1c1",null),g=b.exports,v=r("ed08"),x={components:{ImageUpload:g},data:function(){return{orderForm:{customerName:"",contactName:"",contactPhone:"",address:"",detailAdd:"",title:"",category:"",appointsTime:"",priority:"",content:"",imgs:[],label:[],deviceId:""},orderFormRules:{customerName:[{required:!0,message:"客户名称",trigger:"blur"}],contactName:[{required:!0,message:"联系人",trigger:"blur"}],contactPhone:[{required:!0,message:"联系电话",trigger:"blur"}],address:[{required:!0,message:"服务地址",trigger:"blur"}],title:[{required:!0,message:"工单标题",trigger:"blur"}],appointsTime:[{required:!0,message:"预约时间",trigger:"change"}],deviceId:[{required:!0,message:"选择设备",trigger:"change"}]}}},mounted:function(){void 0!=this.$route.query.device&&(this.orderForm.deviceId=this.$route.query.device)},computed:Object(l["a"])({},Object(d["b"])({visitedRoutes:"visitedRoutes",userInfo:"userInfo",deviceList:"deviceList"})),methods:{onSubmit:function(){var e=this;this.$refs.orderForm.validate(function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(r){var o,i,a,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=18;break}return o=e.generateUUID(),e.orderForm["id"]=o,e.orderForm["createTime"]=Object(v["b"])(new Date),e.orderForm["assigners"]=[],e.orderForm["creater"]=e.userInfo.name,e.$store.commit("demo/PUSH_ORDERLIST",e.orderForm),e.$store.commit("demo/UPDATE_LOGOBJ",{title:"创建工单",date:e.orderForm["createTime"],des:e.userInfo.name+"创建了新工单",orderId:o}),e.$store.commit("demo/UPDATE_DEVICELIST",{state:2,id:e.orderForm.deviceId}),i=e.deviceList.filter((function(t){return t.id==e.orderForm.deviceId}))[0],e.$store.commit("demo/UPDATE_DEVICELOGOBJ",{title:"维修日志",date:e.orderForm["createTime"],data:i,deviceId:e.orderForm.deviceId,orderId:o}),l=e.$route.path,e.visitedRoutes.forEach((function(e,t){l==e.path&&(a=e)})),t.next=15,e.$store.dispatch("tabsBar/delRoute",a);case 15:e.$router.push({path:"/workOrder/assign"}),t.next=20;break;case 18:return console.log("error submit!!"),t.abrupt("return",!1);case 20:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},generateUUID:function(){var e=(new Date).getTime();window.performance&&"function"===typeof window.performance.now&&(e+=performance.now());var t="xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(function(t){var r=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?r:3&r|8).toString(16)}));return t}}},w=x,y=(r("c058"),Object(h["a"])(w,o,i,!1,null,"1cb93edd",null));t["default"]=y.exports},"469c":function(e,t,r){},aa48:function(e,t,r){"use strict";r("469c")},c058:function(e,t,r){"use strict";r("081c")},fe88:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));r("d3b7"),r("3ca3"),r("ddb0"),r("2b3d"),r("9861"),r("ac1f"),r("1276"),r("5cc6"),r("9a8c"),r("a975"),r("735e"),r("c1ac"),r("d139"),r("3a7b"),r("d5d6"),r("82f8"),r("e91f"),r("60bd"),r("5f96"),r("3280"),r("3fcc"),r("ca91"),r("25a1"),r("cd26"),r("3c5d"),r("2954"),r("649e"),r("219c"),r("170b"),r("b39a"),r("72f7");function o(e){var t=null;return void 0!=window.createObjectURL?t=window.createObjectURL(e):void 0!=window.URL?t=window.URL.createObjectURL(e):void 0!=window.webkitURL&&(t=window.webkitURL.createObjectURL(e)),t}}}]);
//# sourceMappingURL=chunk-2c061808.1e75ba35.js.map