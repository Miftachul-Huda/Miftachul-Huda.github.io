import { PerspectiveCamera as camera } from 'three'
import { damp3, dampE } from 'maath/easing'

export default class Camera extends camera {

	public target:camera

	constructor() {
		super()

		this.target = new camera()
		this.target.fov = 45
		this.target.near = 1
		this.target.far = 2000
		this.target.position.set( 0, 0, 10 )
		this.fov = 45
		this.near = 1
		this.far = 2000
		this.position.set( 0, 0, 10 )
		this.resize()

		window.addEventListener( 'resize', () => this.resize() )
		
	}

	private resize() {

		this.target.aspect = innerWidth / innerHeight
		this.aspect = innerWidth / innerHeight
		this.target.updateProjectionMatrix()
		this.updateProjectionMatrix()
	
	}

	public update( delta:number ) {
		
		damp3( this.position, this.target.position, 200, delta )
		dampE( this.rotation, this.target.rotation, 200, delta )

	}
}