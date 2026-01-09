
function last_phone(t) {

	var y;

	if (typeof t == "object")
		y = t.value;

	if (typeof t != "object")
		y = t;

	var num = y.split(" ");

	var ddd = num[0];
	var n = num[1].replace("-", "");
	var n0 = n.substring(0, 1);
	var n1 = n.substring(1, 5);
	var n2 = n.substring(5, 9);

	var num = ddd 
	 + " " 
	 + n0 
	 + " " 
	 + n1
	 + "-"
	 + n2 
	if (num.indexOf("-") == 11) {
		t.value = num;
	} else t.value = "";
	return num;

}

function _phone(v, e) {
	// apaga 1 caractere se não for número
	var result = isNumberic(e, { success: function(Digit) {
		if (Digit != 8) {
			if (v.value.length == 1) v.value = '(' + v.value;
			if (v.value.length == 3) v.value += ') ';
			if (v.value.length == 9) v.value += '-';
		}

		return true;
	}, error: function(Digit) { return false } });

	if (e.type == "keyup" || e.type == "keydown") {
		if (result == false) v.value = v.value.substring(0, v.value.length - 1);
		return false;
	}
}


function isNumberic(e, action, add) {
    var NS, Digit;
    NS = (navigator.appName == "Netscape");
    Digit = parseInt(eval(((NS) ? "e.which" : "e.keyCode")));

    if (!((Digit > 47 && Digit < 58) || (Digit >= 96 && Digit <= 105) || Digit == 8 || Digit == 0 || Digit == 13 || Digit == 83
    	|| (Digit >= 16 && Digit <= 18) || (Digit >= 33 && Digit <= 40) )) {
    	if (add) if (add.space == true) if (!Digit == 32) if (action) if (action.error) return action.error(Digit); 
		if (action) if (action.error) return action.error(Digit); 
    	return false;    
	}
    else if (action) if (action.success) return action.success(Digit);
	else return false;

}
