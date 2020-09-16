(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 10px;
			border-width: 2px;
			border-color: black;
			border-style: solid;
			display: block;
		} 

		body {
		  background: #fff;
		}
		
		</style>
		
		<div class="container">
		  <div class="row">
		    <div class="col-md-4 col-sm-4">
		      <div class="metric participation" data-ratio=".95">
		        <svg viewBox="0 0 1000 500">   
		        	<path d="M 950 500 A 450 450 0 0 0 50 500"></path>
  	            </svg>
		      </div>
		    </div>
		  </div>
		</div>
	`;

	class Box extends HTMLElement {
		constructor() {
			console.log("Test 1");
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$svg = shadowRoot.querySelector('svg');
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(val, info, color) {
			var val1 = val * 0.01;
			var x = this.svg_circle_arc_path(500, 500, 450, -90, val1 * 180.0 - 90);
			var rounded = Math.round( val * 10 ) / 10;

			console.log(this.$svg.innerHTML);

			
			if(rounded >=0 && rounded <=100) {
				this.$svg.innerHTML = '<path d="M 950 500 A 450 450 0 0 0 50 500"></path>';
			}
		}
		  
		polar_to_cartesian(cx, cy, radius, angle) {
		    var radians;
		    radians = (angle - 90) * Math.PI / 180.0;
		    return [Math.round((cx + radius * Math.cos(radians)) * 100) / 100, Math.round((cy + radius * Math.sin(radians)) * 100) / 100];
		}
		
		svg_circle_arc_path(x, y, radius, start_angle, end_angle) {
		    var end_xy, start_xy;
		    start_xy = this.polar_to_cartesian(x, y, radius, end_angle);
		    end_xy = this.polar_to_cartesian(x, y, radius, start_angle);
		    return "M " + start_xy[0] + " " + start_xy[1] + " A " + radius + " " + radius + " 0 0 0 " + end_xy[0] + " " + end_xy[1];
		  };
		  

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
			
			if ("info" in changedProperties) {
				this.$info = changedProperties["info"];
			}
			
			if ("color" in changedProperties) {
				this.$color = changedProperties["color"];
			}
			
			this.render(this.$value, this.$info, this.$color);
		}
	}
	
	customElements.define("com-linear-gauge", Box);
})();
