import { PerspectiveCamera as camera } from "three"

export default class Camera extends camera {

	constructor() {
		super()

		this.fov = 45
		this.near = 1
		this.far = 2000
		this.resize()

		window.addEventListener( 'resize', () => this.resize() )
		
	}

	public resize() {

		this.aspect = innerWidth / innerHeight
		this.updateProjectionMatrix()
	
	}

}