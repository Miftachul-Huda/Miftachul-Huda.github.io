export default class Stats {

	private dom:HTMLElement
	private time:number
	private count:number | any
	
	constructor() {

		this.dom = document.createElement('stats')
		this.time = performance.now()
		this.count = 0

		document.body.append( this.dom )

	}

	public update() {

		const now = performance.now()

		if ( now - 1000 > this.time ) {

			this.time = now
			this.dom.textContent = this.count
			this.count = 0

		}

		this.count ++

	}
}