var Header = React.createClass({
	render: function(){
		return(
			<div id="headerInde">
				<ul>
					<li><a href="/projects">Projects</a></li>
					<li><a href="/people">People</a></li>
					<li><a href="/philsophy">Philsophy</a></li>
					<li><a href="/freelance">Freelance</a></li>
				</ul>
			</div>
		);
	}
});

React.render(<Header />, document.getElementById("header"));