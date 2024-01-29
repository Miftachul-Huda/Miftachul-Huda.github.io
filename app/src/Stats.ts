import stats from 'three/addons/libs/stats.module.js'

export default class Stats extends stats {
	
	constructor() {
		super()

		document.body.append( this.dom )

	}
}