import Model from './Model'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { PerspectiveCamera, Vector3 } from 'three'

export default class Controls {

	private model:Model
	private domElement:HTMLElement
	private controls:OrbitControls
	private target:Vector3
	public camera:PerspectiveCamera

	constructor( camera:PerspectiveCamera, domElement:HTMLElement, model:Model ) {

		this.camera = camera
		this.domElement = domElement
		this.model = model
		this.target = new Vector3()

		this.controls = new OrbitControls( this.camera, this.domElement )
		this.controls.rotateSpeed = .5
		this.controls.enablePan = false
	
	}

	public lookAt = {
		
		monitor : () => {

			const screen = this.model.monitor.screen
			this.target.copy( screen.position )
			this.camera.position.copy( screen.position )
			this.camera.position.z += 10
			this.camera.lookAt( screen.position )
			this.controls.target = this.target
			this.controls.minDistance = 4
			this.controls.maxDistance = 60
			// this.controls.minAzimuthAngle = -2
			// this.controls.maxAzimuthAngle = 2
			// this.controls.minPolarAngle = .3
			// this.controls.maxPolarAngle = 2
		
		}
	}

	public update() {

	}
}