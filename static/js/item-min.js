String.prototype.formatUnicorn=String.prototype.formatUnicorn||function(){"use strict";var a=this.toString();if(arguments.length){var b=typeof arguments[0],c,d="string"==b||"number"==b?Array.prototype.slice.call(arguments):arguments[0];for(c in d)a=a.replace(new RegExp("\\{"+c+"\\}","gi"),d[c])}return a};var cuForm=`<form onsubmit="event.preventDefault(); return submitForm(this, '{url}', '{hideButton}');" method="{method}"> <div class="row"> <div class="six columns"> <label for="form-name">{type} name</label> <input class="u-full-width" type="text" name="name" id="form-name" placeholder="Title" value="{name}"> </div> </div> <label for="form-desc">Description</label> <textarea name="desc" class="u-full-width" placeholder="Something awesome goes here" id="form-desc">{desc}</textarea> <ul class="error"></ul> <input class="button-cancel"type="button" value="Cancel" onclick="hideMeShowOther('{hideButton}', '{showDiv}');"> <input class="button-primary u-pull-right" type="submit" value="Submit"> </form> `,dForm=`<form onsubmit="event.preventDefault(); return submitForm(this, '{url}', '{hideButton}');" method="{method}"> <div class="row"> Are you sure you want to delete this {type} <ul class="error"></ul> <input class="button-cancel"type="button" value="Cancel" onclick="hideMeShowOther('{hideButton}', '{showDiv}');"> <input class="button-danger u-pull-right" type="submit" value="Yes, delete this"> </form>
`;function itemForm(a,b,c,d,e=null,f="",g="",h=""){var j=cuForm;return"delete"===a?j=dForm:void 0,j.formatUnicorn({method:a,url:b,type:c,hideButton:d,showDiv:e,ID:f,name:g,desc:h})}var items;function getItems(a,b){b.empty(),$.getJSON(a,function(c){if(0<c.items.length){items=c.items,jQuery("<div/>",{class:"items tiles"}).appendTo(b);for(var d=b.find("div.items"),e=0;e<c.items.length;e++){item=c.items[e],jQuery("<div/>",{id:"item-"+e,class:"item tile"}).appendTo(d);var f=d.find("#item-"+e);jQuery("<div/>",{class:"item-name",style:"cursor: pointer;",onclick:"elementDisplayMore(\"item\",\"#item-"+e+"\",true,"+item.id+");",text:item.name}).appendTo(f),jQuery("<div/>",{class:"item-catagory",text:item.catagory}).appendTo(f.children("div.item-name")),jQuery("<div/>",{class:"item-desc item-more no-display"}).appendTo(f),jQuery("<div/>",{class:"item-username item-more no-display"}).appendTo(f),jQuery("<div/>",{class:"crud_buttons item-more no-display"}).appendTo(f),jQuery("<div/>",{class:"add-item form item-more no-display"}).appendTo(f)}}})}var catagories;function getElementByID(a,b){var c;switch(a.toLowerCase()){case"catagory":c=catagories;break;case"item":c=items;}if(c)for(var e,d=0;d<c.length;d++)if(e=c[d],e.id===parseInt(b))return e}function getCatagories(a="/json/catalog/",b=$(".catag")){b.empty(),$.getJSON(a,function(c){if(0<c.catagories.length){catagories=c.catagories,jQuery("<div/>",{class:"catagories tiles"}).appendTo(b);for(var d=b.find("div.catagories"),e=0;e<c.catagories.length;e++){catagory=c.catagories[e];var f="catagory-"+e;jQuery("<div/>",{id:f,class:"catagory tile"}).appendTo(d);var g=d.children("#"+f);jQuery("<div/>",{class:"catagory-name",text:catagory.name,style:"cursor: pointer;",onclick:"catagoryDisplayMore("+[e,"'catagory'",+catagory.id,"'#"+f+"'"].join(",")+");"}).appendTo(g),jQuery("<div/>",{class:"catagory-desc item-more no-display"}).appendTo(g),jQuery("<div/>",{class:"catagory-username item-more no-display"}).appendTo(g),jQuery("<div/>",{class:"crud_buttons item-more no-display"}).appendTo(g),jQuery("<div/>",{class:"add-item form item-more no-display"}).appendTo(g)}}})}function userLoggedIn(){if(0<$("#current_userid").length)return $("#current_userid").html()}function catagoryDisplayMore(a,b,c,d,e=!1){elementDisplayMore(b,d,!0,c);var f=$(d),g="catagory-"+a+"-items";(e||null===document.getElementById(g))&&(jQuery("<div/>",{id:g=g,class:"item-more"}).appendTo(d),getItems("/json/catalog/"+c,$("#"+g)))}function elementDisplayMore(a,b,c=!0,d=-1){var e=$(b);if(e.parent().children().removeClass(a+"-expand"),e.parent().children().children("div.item-more").css("display","none"),e.parent().children().children("div.item-close").css("display","none"),c){e.addClass(a+"-expand"),e.children(".item-more").css("display","block"),0===e.children("div.button-close").length&&jQuery("<div/>",{class:"fa fa-close button-close  item-more u-pull-right",style:"cursor: pointer;",onclick:"elementDisplayMore(\""+a+"\",\"#"+e.attr("id")+"\", openThis=false);"}).prependTo(e);var f=b+" .form",g=getElementByID(a,d),h=e.children("div."+a+"-desc"),j=e.children("div."+a+"-username");if(h.is(":empty")&&(h.html(markdown.toHTML(g.description)),j.text(g.username),userLoggedIn())){var l=e.children("div.crud_buttons");"catagory"===a&&addCrudButton(l,"new","item",f,g.id),userLoggedIn()==g.created_by_user_id&&(addCrudButton(l,"edit",a,f,g.id),addCrudButton(l,"delete",a,f,g.id))}$("html, body").animate({scrollTop:e.offset().top-100},200)}}function addCrudButton(a,b,c,d,e){var f="",g="";"new"===b?(f="Add a new "+c,g="fa fa-plus-circle"):"edit"===b?(f="Edit this "+c,g="fa fa-plus-circle"):"delete"===b?(f="Delete this "+c,g="fa fa-trash-o"):void 0;var h=[d,b,c,a.id,e].join("\",\"");jQuery("<div/>",{class:"myButton "+g,style:"cursor: pointer;",onclick:"showForm(\""+h+"\");",text:" "+f}).appendTo(a)}function showForm(a,b,c,d,e=-1){var f=$(a+":first");f.empty(),$(d).hide(),f.show();var g="post",h="",j="",l="",m="",n=getElementByID(c,e),o="json/catalog/";switch(b+c){case"newitem":case"editcatagory":case"deletecatagory":o+=e+"/";break;case"edititem":case"deleteitem":o+=n.catagory_id+"/"+e+"/";}switch(b+c){case"newitem":case"newcatagory":h="Create a new "+c;break;case"edititem":h="Edit an item under catagory",g="put";break;case"editcatagory":h="Edit catagory",g="put";break;case"deleteitem":case"deletecatagory":h="Delete catagory",m="danger",g="delete";}"edit"===b&&(j=n.name,l=n.description),jQuery("<h3/>",{class:m,text:h}).appendTo(f),f.append(itemForm(g=g,o=o,c=c,d=d,showDiv=a,itemID=e,j=j,l=l)),f.find("input:text:visible:first").focus()}function hideMeShowOther(a,b){$(document).ready(function(){"none"==$(b).css("display")?($(b).show(),$(a).hide()):($(b).hide(),$(a).show())})}function submitForm(a,b,c){a=$(a),$.ajax({url:b,type:a.attr("method"),dataType:"json",data:a.serialize(),success:function(d){for(var e in clearNotifications(a.children(".error")),d)d.hasOwnProperty(e)&&(errorDiv=null,"error"===e?errorDiv=a.children(".error"):"success"===e&&(a.hide(),$(c).show(),getCatagories(),getItems("/json/catalog/items/latest/",$(".items"))),addNotification(e,d[e],errorDiv))}})}function clearNotifications(a=null){a&&0!==a.length||(a=$("ul.flashes")),$(a).empty()}function addNotification(a,b,c=null){c&&0!==c.length||(c=$("ul.flashes")),jQuery("<li/>",{class:a,text:b}).appendTo(c),$("div.notifications").show(),setTimeout(dismiss,8e3)}function dismiss(a=400){$("div.notifications").fadeOut(a,clearNotifications())}$(document).ready(function(){var a=$("ul.flashes").find("li");0<a.length&&($("div.notifications").show(),setTimeout(dismiss,8e3)),jQuery("<div/>",{id:"new-add-catagory-form-div",class:"add-addCatagory no-display"}).appendTo($("div.add-catagory")),getCatagories(),getItems("/json/catalog/items/latest/",$(".items"))});