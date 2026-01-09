function validate_number() 
{
	this.value = this.value.replace(/[^\d]/, ''); 
}

function isNumber(Fields) 
{
	Fields.forEach(
		function(Field)
		{
			[
				'keydown', 
				'keypress', 
				'keyup', 
				'mousedown', 
				'click', 
				'mouseup', 
				'blur', 
				'focus', 
				'select',
				'mousemove',
				'mouseenter',
				'mouseleave',
				'mouseover',
				'mouseout',
				'oncopy'
			]

			.forEach(
				function(event) {
					Field.addEventListener(event, validate_number);							
					Field.onpaste = function() { return false }							
				}
			);
		}
	);
}
