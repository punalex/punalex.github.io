function loadoptions(options){
	chrome.storage.sync.get(options, function(items) {
		Object.assign(options, items);
	});
}
function getvalue(worksheet, options){
	if (options.substr(0, 1).match(/[a-zA-Z]/g)){
		if (typeof worksheet[options] !== "undefined")
			return worksheet[options].v;
		else
			return null;
	}
	return options;
}
var ExcelToJSON = function() {
	var options = initoption();
	loadoptions(options);
	this.parseExcel = function(file) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			var workbook = XLSX.read(data, {
				type: 'binary'
				, cellDates: true
			});
			workbook.SheetNames.forEach(function(sheetName) {
				if (sheetName.toUpperCase() == "NOCAF"){
					var worksheet = workbook.Sheets[sheetName];
					// Fill date
					if (document.getElementsByName(options.startdatehtml)[0] !== undefined) document.getElementsByName(options.startdatehtml)[0].value = moment(new Date(getvalue(worksheet, options.startdatexls))).add(8, 'h').format("YYYY-MM-DD");
					if (document.getElementsByName(options.enddatehtml)[0] !== undefined) document.getElementsByName(options.enddatehtml)[0].value = moment(new Date(getvalue(worksheet, options.enddatexls))).add(8, 'h').format("YYYY-MM-DD");
					// Fill start time
					if (document.getElementsByName(options.starttimehtml)[0] !== undefined) document.getElementsByName(options.starttimehtml)[0].value = moment(new Date(getvalue(worksheet, options.starttimexls))).format("HH:mm");
					// Fill start time
					if (document.getElementsByName(options.endtimehtml)[0] !== undefined) document.getElementsByName(options.endtimehtml)[0].value = moment(new Date(getvalue(worksheet, options.endtimexls))).format("HH:mm");
					// Fill location
					if (document.getElementsByName(options.locatehtml)[0] !== undefined) document.getElementsByName(options.locatehtml)[0].value = getvalue(worksheet, options.locatexls);
					// Fill Rack
					if (document.getElementsByName(options.rackhtml)[0] !== undefined) document.getElementsByName(options.rackhtml)[0].value = getvalue(worksheet, options.rackxls);
					// Fill Contact Person
					if (document.getElementsByName(options.contacthtml)[0] !== undefined) document.getElementsByName(options.contacthtml)[0].value = getvalue(worksheet, options.contactxls) + ' ' + getvalue(worksheet, options.contactnoxls);
					// Fill Visitors
					if (document.getElementsByClassName("add_field_button")[0].innerText.toUpperCase().indexOf("VISITOR") != -1){
						var baseno=Number(options.visitorxls.replace(/^[A-Za-z]/g,''));
						var basenamehtml=options.visitorhtml.replace(/[0-9]+$/g,'');
						var basenamexls=options.visitorxls.replace(/[0-9]+$/g,'');
						var basenohtml=options.visitornohtml.replace(/[0-9]+$/g,'');
						var basenoxls=options.visitornoxls.replace(/[0-9]+$/g,'');
						var basetype=options.visitortypehtml.replace(/[0-9]+$/g,'')
						var baseidhtml=options.visitoridhtml.replace(/[0-9]+$/g,'');
						var baseidxls=options.visitoridxls.replace(/[0-9]+$/g,'');
						for (var i = 1; i < Number(options.maxvisitorxls)+1 && getvalue(worksheet, basenamexls+baseno) && getvalue(worksheet, basenamexls+baseno).trim().length; (i++)&(baseno++)){
							if (i != 1)
								document.getElementsByClassName("add_field_button")[0].click();
							if (document.getElementById(basenamehtml+i) != null){
								document.getElementById(basenamehtml+i).value = getvalue(worksheet, basenamexls+baseno);
								document.getElementById(basenohtml+i).value = getvalue(worksheet, basenoxls+baseno);
								if (options.visitortypexls != 0)
									document.getElementById(basetype+i).selectedIndex = options.visitortypexls;
								document.getElementById(baseidhtml+i).value = getvalue(worksheet, baseidxls+baseno);
							}
						}
					}
					if (document.getElementsByClassName("add_field_button")[0].innerText.toUpperCase().indexOf("ITEM") != -1){
						var baseno=Number(options.equipmentxls1.replace(/^[A-Za-z]/g,''));
						var baseequipmenthtml=options.equipmenthtml.replace(/[0-9]+$/g,'');
						var baseequipmentxls1=options.equipmentxls1.replace(/[0-9]+$/g,'');
						var baseequipmentxls2=options.equipmentxls2.replace(/[0-9]+$/g,'');
						var baseequipmentxls3=options.equipmentxls3.replace(/[0-9]+$/g,'');
						var basenohtml=options.equipmentnohtml.replace(/[0-9]+$/g,'');
						var basenoxls=options.equipmentnoxls.replace(/[0-9]+$/g,'');
						var baserackhtml=options.equipmentrackhtml.replace(/[0-9]+$/g,'');
						var baserackxls=options.equipmentrackxls.replace(/[0-9]+$/g,'');
						var baseqtyhtml=options.equipmentqtyhtml.replace(/[0-9]+$/g,'');
						var baseqtyxls=options.equipmentqtyxls.replace(/[0-9]+$/g,'');
						var basemovehtml=options.equipmentmovehtml.replace(/[0-9]+$/g,'');
						var basemovexls=options.equipmentmovexls.replace(/[0-9]+$/g,'');
						for (var i = 1; i < Number(options.maxequipmentxls)+1 && getvalue(worksheet, basenoxls+baseno) && getvalue(worksheet, basenoxls+baseno).trim().length; (i++)&(baseno++)){
							if (i != 1)
								document.getElementsByClassName("add_field_button")[0].click();
							if (document.getElementsByName(baseequipmenthtml)[i-1] != null){
								document.getElementsByName(baseequipmenthtml)[i-1].value = getvalue(worksheet, baseequipmentxls1+baseno)+' '+getvalue(worksheet, baseequipmentxls2+baseno)+' '+getvalue(worksheet, baseequipmentxls3+baseno);
								document.getElementsByName(basenohtml)[i-1].value = getvalue(worksheet, basenoxls+baseno);
								document.getElementsByName(baserackhtml)[i-1].value = getvalue(worksheet, baserackxls+baseno);
								document.getElementsByName(baseqtyhtml)[i-1].value = getvalue(worksheet, baseqtyxls+baseno);
								document.getElementsByName(basemovehtml)[i-1].selectedIndex = (getvalue(worksheet, basemovexls+baseno).toUpperCase().indexOf('IN') != -1)?(1):(2);
							}
						}
						if (options.undertakexls === "true")
							if (document.getElementsByName(options.undertakehtml)[0] !== null) document.getElementsByName(options.undertakehtml)[0].checked = options.undertakexls;
					}
					// Site
					if (options.sitexls != 0)
						if (document.getElementById(options.sitehtml) !== null) document.getElementById(options.sitehtml).selectedIndex = options.sitexls;
					if (options.sitexls != 0)
						if (document.getElementsByName(options.site2html)[0] !== undefined) document.getElementsByName(options.site2html)[0].selectedIndex = options.sitexls;
					// Reason
					if (options.reasonxls != 0)
						if (document.getElementById(options.reasonhtml) !== null) document.getElementById(options.reasonhtml).selectedIndex = options.reasonxls;					
					// Checkbox
					if (options.termsxls === "true")
						if (document.getElementsByName(options.termshtml)[0] !== null) document.getElementsByName(options.termshtml)[0].checked = options.termsxls;
				}
			});
		};
		reader.onerror = function(ex) {
			console.log(ex);
		};
		reader.readAsBinaryString(file);
	};
};
const xlsbtn = document.createElement('label');
//xlsbtn.type = "file";
xlsbtn.innerHTML = '<input class="upload" type="file" id="filename" style="display:none" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/><span id="uploadtext">Upload Excel File</span>';
xlsbtn.style = "font-size : medium; border: 1px solid #000000;border-radius: 10px; vertical-align: middle; padding: 5px 10px; width:fit-content; textAlign: center; overflow: hidden; text-overflow: ellipsis; background-color:#FF0000; font-weight:bold; color:#FFFFFF";
xlsbtn.onchange = function() {
	xls2json = new ExcelToJSON;
	xls2json.parseExcel(document.getElementById('filename').files[0]);
	uploadtext.innerText = document.getElementById('filename').files[0].name;
};
document.querySelectorAll('h2')[0].appendChild(xlsbtn);