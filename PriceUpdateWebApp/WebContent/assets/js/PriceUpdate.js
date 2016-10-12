$.ajax({
  url: "https://dpcvxy05e5.execute-api.us-east-1.amazonaws.com/prod/fund-prices",
  data: {},
  success: function (data)
  {
	  console (data);
  } 
});

priceModel = {
		"prices":[
		    {"trpCode":"MSFT", "price":100.5},
		    {"trpCode":"CSCO", "price":15.45},
		    {"trpCode":"IBM", "price":12.34}
    	],
    	addOnFocusOut: function(element, index, data)
    	{
    		console.log (data);
    	}
};


// Ensure numbers always have two decimals
function makeSureNumbersHaveTwoDecimals (priceModel)
{
	for (var i=0; i<priceModel.prices.length; i++)
	{
		var price = priceModel.prices[i].price;
		priceModel.prices[i].price = parseFloat(Math.round(price * 100) / 100).toFixed(2);
	}
};
makeSureNumbersHaveTwoDecimals (priceModel);

ko.applyBindings (
		priceModel, $("#main-container").get (0)
);

/**
 * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
 */
$(function() {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    
    function setupDialog ()
    {
    	ko.cleanNode ($("#myModal").get (0));
    	
    	$('#myModal .btn-primary').click(function() {
    		// Save the data
    	});
    	$('.modal').on ('show.bs.modal', setupDialog);
    	ko.applyBindings (
    		{
    			trpCode: priceModel.prices[0].trpCode,
    			price: priceModel.prices[0].price
    		}, 
    		$("#myModal").get (0)
    	);
    	setTimeout (function ()
    			{
    				$('.modal input:text:visible:first').focus();
    			}, 1);
    	reposition ();
    }
    
    function cleanupDialog ()
    {
    	console.log ("cleanupDialog");
    }

    // Reposition when a modal is shown
    $('.modal').on ('show.bs.modal', setupDialog);
    // Reposition when the window is resized
    $(window).on ('resize', function() {
        $('.modal:visible').each(reposition);
    });
});