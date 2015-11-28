var Header = React.createClass({displayName: "Header",
	render: function(){
		return(
			React.createElement("div", null, 
				"HI!"
			)
		);
	}
});

React.render(React.createElement(Header, null), document.getElementById("header"));