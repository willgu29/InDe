var Header = React.createClass({displayName: "Header",
	render: function(){
		return(
			React.createElement("div", {id: "headerInde"}, 
				React.createElement("ul", null, 
					React.createElement("li", null, React.createElement("a", {href: "/projects"}, "Projects")), 
					React.createElement("li", null, React.createElement("a", {href: "/people"}, "People")), 
					React.createElement("li", null, React.createElement("a", {href: "/philsophy"}, "Philsophy")), 
					React.createElement("li", null, React.createElement("a", {href: "/freelance"}, "Freelance"))
				)
			)
		);
	}
});

React.render(React.createElement(Header, null), document.getElementById("header"));