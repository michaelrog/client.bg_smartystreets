//<![CDATA[

$(function(){

	// ========================================== 
	// ============ CART/CHECKOUT FORMS
	// ========================================== 

	var sync_shipping_and_billing = function() {
		window.log("Syncing shipping and billing addresses...");
		$('#shipping_name').val( $('#order_custom1').val() + " " + $('#order_custom2').val() );
		$('#shipping_address1').val( $('#billing_address1').val() );
		$('#shipping_address2').val( $('#billing_address2').val() );
		$('#shipping_address3').val( $('#billing_address3').val() );
		$('#shipping_region').val( $('#billing_region').val() );
		$('#shipping_postcode').val( $('#billing_postcode').val() );
		$('#shipping_phone').val( $('#billing_phone').val() );
	}
	
	var clear_shipping = function() {
		window.log("Clearing shipping fields...");
		$('#shipping_name').val(" ");
		$('#shipping_address1').val(" ");
		$('#shipping_address2').val(" ");
		$('#shipping_address3').val(" ");
		$('#shipping_region').val(" ");
		$('#shipping_postcode').val(" ");
		$('#shipping_phone').val(" ");
	}

	try
	{
		
		shipping_fields_map = {
			id: "shipping",
			street: '#shipping_address1',
			street2: '#shipping_address2',
			city: '#shipping_address3',
			state: '#shipping_region',
			zipcode: '#shipping_postcode'
		};
		
		billing_fields_map = {
			id: "billing",
			street: '#billing_address1',
			street2: '#billing_address2',
			city: '#billing_address3',
			state: '#billing_region',
			zipcode: '#billing_postcode'
		};
	
		var liveaddress = $.LiveAddress({
			key: '2688654354902907366',
			debug: true,
			autoMap: false,
			addresses: [shipping_fields_map, billing_fields_map]
		});
		
		$('#shipping_same_as_billing').change(function() {
			if (this.checked) {
				$('#shipping_details_drawer').slideUp();
				clear_shipping();
				liveaddress.deactivate("shipping");
			} else {
				$('#shipping_details_drawer').slideDown();
				sync_shipping_and_billing();
				liveaddress.activate("shipping");
			}
		});
		
		if ($('#shipping_same_as_billing').is(':checked')) {
			$('#shipping_details_drawer').hide();
			clear_shipping();
			liveaddress.deactivate("shipping");
		}


		var order_custom3_change = function() {
			var v = $("#order_custom3").val();
			var l = "";
			switch(v) {
				case "Web search":
					window.log(v);
					l="";
				break;
				case "Magazine":
					window.log(v);
					l="Which magazine?";
				break;
				case "Blog":
					window.log(v);
					l="Which blog?";
				break;
				case "Event":
					window.log(v);
					l="Which event?";
				break;
				case "Friend":
					window.log(v);
					l="Who told you about BlingGuard?";
				break;
				case "Other":
					window.log(v);
					l=" ... ";
				break;
				default:
					window.log(v);
					l = "";
			}
			if (l != "") {
				$("#order_custom4_label").text(l);
				$("#referral_drawer").slideDown();
			}
			else {
				$("#referral_drawer").hide();
				$("#order_custom4_label").text("");
			}
		};
		$("#order_custom3").change(order_custom3_change);
		order_custom3_change();
		
		$("#csc_help_popover").popover({placement:'right'});
		
	}
	catch(err)
	{
		window.log("ERROR in CART/CHECKOUT FORMS: " + err.message);
	}
	
});

//]]>