document.getElementById("save").onclick = function(){
	const startdatehtml = document.getElementById("startdatehtml").value;
	const startdatexls = document.getElementById("startdatexls").value;
	const enddatehtml = document.getElementById("enddatehtml").value;
	const enddatexls = document.getElementById("enddatexls").value;
	const starttimehtml = document.getElementById("starttimehtml").value;
	const starttimexls = document.getElementById("starttimexls").value;
	const endtimehtml = document.getElementById("endtimehtml").value;
	const endtimexls = document.getElementById("endtimexls").value;
	const locatehtml = document.getElementById("locatehtml").value;
	const locatexls = document.getElementById("locatexls").value;		
	const rackhtml = document.getElementById("rackhtml").value;
	const rackxls = document.getElementById("rackxls").value;
	const contacthtml = document.getElementById("contacthtml").value;
	const contactxls = document.getElementById("contactxls").value;
	const contactnohtml = document.getElementById("contacthtml").value;
	const contactnoxls = document.getElementById("contactnoxls").value;
	const maxvisitorxls = document.getElementById("maxvisitorxls").value;
	const visitorhtml = document.getElementById("visitorhtml").value;
	const visitorxls = document.getElementById("visitorxls").value;
	const visitortypehtml = document.getElementById("visitortypehtml").value;
	const visitortypexls = document.getElementById("visitortypexls").value;
	const visitoridhtml = document.getElementById("visitoridhtml").value;
	const visitoridxls = document.getElementById("visitoridxls").value;
	const visitornohtml = document.getElementById("visitornohtml").value;
	const visitornoxls = document.getElementById("visitornoxls").value;
	const maxequipmentxls = document.getElementById("maxequipmentxls").value;
	const equipmenthtml = document.getElementById("equipmenthtml").value;
	const equipmentxls1 = document.getElementById("equipmentxls1").value;
	const equipmentxls2 = document.getElementById("equipmentxls2").value;
	const equipmentxls3 = document.getElementById("equipmentxls3").value;
	const equipmentnohtml = document.getElementById("equipmentnohtml").value;
	const equipmentnoxls = document.getElementById("equipmentnoxls").value;
	const equipmentrackhtml = document.getElementById("equipmentrackhtml").value;
	const equipmentrackxls = document.getElementById("equipmentrackxls").value;
	const equipmentqtyhtml = document.getElementById("equipmentqtyhtml").value;
	const equipmentqtyxls = document.getElementById("equipmentqtyxls").value;
	const equipmentmovehtml = document.getElementById("equipmentmovehtml").value;
	const equipmentmovexls = document.getElementById("equipmentmovexls").value;
	const sitehtml = document.getElementById("sitehtml").value;
	const site2html = document.getElementById("site2html").value;
	const sitexls = document.getElementById("sitexls").value;	
	const reasonhtml = document.getElementById("reasonhtml").value;
	const reasonxls = document.getElementById("reasonxls").value;
	const undertakehtml = document.getElementById("undertakehtml").value;
	const undertakexls = document.getElementById("undertakexls").value;
	const termshtml = document.getElementById("termshtml").value;
	const termsxls = document.getElementById("termsxls").value;
	chrome.storage.sync.set(
	{
		startdatehtml: startdatehtml,
		startdatexls: startdatexls,
		enddatehtml: enddatehtml,
		enddatexls: enddatexls,
		starttimehtml: starttimehtml,
		starttimexls: starttimexls,
		endtimehtml: endtimehtml,
		endtimexls: endtimexls,
		locatehtml: locatehtml,
		locatexls: locatexls,		
		rackhtml: rackhtml,
		rackxls: rackxls,
		contacthtml: contacthtml,
		contactxls: contactxls,
		contactnohtml: contactnohtml,
		contactnoxls: contactnoxls,
		maxvisitorxls: maxvisitorxls,
		visitorhtml: visitorhtml,
		visitorxls: visitorxls,
		visitortypehtml: visitortypehtml,
		visitortypexls: visitortypexls,
		visitoridhtml: visitoridhtml,
		visitoridxls: visitoridxls,
		visitornohtml: visitornohtml,
		visitornoxls: visitornoxls,
		maxequipmentxls: maxequipmentxls,
		equipmenthtml: equipmenthtml,
		equipmentxls1: equipmentxls1,
		equipmentxls2: equipmentxls2,
		equipmentxls3: equipmentxls3,
		equipmentnohtml: equipmentnohtml,
		equipmentnoxls: equipmentnoxls,
		equipmentrackhtml: equipmentrackhtml,
		equipmentrackxls: equipmentrackxls,
		equipmentqtyhtml: equipmentqtyhtml,
		equipmentqtyxls: equipmentqtyxls,
		equipmentmovehtml: equipmentmovehtml,
		equipmentmovexls: equipmentmovexls,		
		sitehtml: sitehtml,
		site2html: site2html,
		sitexls: sitexls,	
		reasonhtml: reasonhtml,
		reasonxls: reasonxls,
		undertakehtml: undertakehtml,
		undertakexls: undertakehtml,
		termshtml: termshtml,
		termsxls: termsxls
	},
	function()
	{
		alert("saved");
	});
}
document.addEventListener('DOMContentLoaded', function(){
	chrome.storage.sync.get(initoption(), function(items) {
		document.getElementById("startdatehtml").value = items.startdatehtml;
		document.getElementById("startdatexls").value = items.startdatexls;
		document.getElementById("enddatehtml").value = items.enddatehtml;
		document.getElementById("enddatexls").value = items.enddatexls;
		document.getElementById("starttimehtml").value = items.starttimehtml;
		document.getElementById("starttimexls").value = items.starttimexls;
		document.getElementById("endtimehtml").value = items.endtimehtml;
		document.getElementById("endtimexls").value = items.endtimexls;
		document.getElementById("locatehtml").value = items.locatehtml;
		document.getElementById("locatexls").value = items.locatexls;
		document.getElementById("rackhtml").value = items.rackhtml;
		document.getElementById("rackxls").value = items.rackxls;
		document.getElementById("contacthtml").value = items.contacthtml;
		document.getElementById("contactxls").value = items.contactxls;
//		document.getElementById("contactnohtml").value = items.contactnohtml;
		document.getElementById("contactnoxls").value = items.contactnoxls;
		document.getElementById("maxvisitorxls").value = items.maxvisitorxls;
		document.getElementById("visitorhtml").value = items.visitorhtml;
		document.getElementById("visitorxls").value = items.visitorxls;
		document.getElementById("visitortypehtml").value = items.visitortypehtml;
		document.getElementById("visitortypexls").value = items.visitortypexls;
		document.getElementById("visitoridhtml").value = items.visitoridhtml;
		document.getElementById("visitoridxls").value = items.visitoridxls;
		document.getElementById("visitornohtml").value = items.visitornohtml;
		document.getElementById("visitornoxls").value = items.visitornoxls;
		document.getElementById("maxequipmentxls").value = items.maxequipmentxls;
		document.getElementById("equipmenthtml").value = items.equipmenthtml;
		document.getElementById("equipmentxls1").value = items.equipmentxls1;
		document.getElementById("equipmentxls2").value = items.equipmentxls2;
		document.getElementById("equipmentxls3").value = items.equipmentxls3;
		document.getElementById("equipmentnohtml").value = items.equipmentnohtml;
		document.getElementById("equipmentnoxls").value = items.equipmentnoxls;
		document.getElementById("equipmentrackhtml").value = items.equipmentrackhtml;
		document.getElementById("equipmentrackxls").value = items.equipmentrackxls;
		document.getElementById("equipmentqtyhtml").value = items.equipmentqtyhtml;
		document.getElementById("equipmentqtyxls").value = items.equipmentqtyxls;
		document.getElementById("equipmentmovehtml").value = items.equipmentmovehtml;
		document.getElementById("equipmentmovexls").value = items.equipmentmovexls;
		document.getElementById("sitehtml").value = items.sitehtml;
		document.getElementById("site2html").value = items.site2html;
		document.getElementById("sitexls").value = items.sitexls;	
		document.getElementById("reasonhtml").value = items.reasonhtml;
		document.getElementById("reasonxls").value = items.reasonxls;
		document.getElementById("undertakehtml").value = items.undertakehtml;
		document.getElementById("undertakexls").value = items.undertakexls;
		document.getElementById("termshtml").value = items.termshtml;
		document.getElementById("termsxls").value = items.termsxls;
	});
});