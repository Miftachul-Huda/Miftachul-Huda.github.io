import Model from './Model'
import { PerspectiveCamera } from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default class Controls {

	private model:Model
	private camera:PerspectiveCamera
	private domElement:HTMLCanvasElement
	private zoomControls:TrackballControls
	private rotateControls:OrbitControls

	constructor( camera:PerspectiveCamera, domElement:HTMLCanvasElement, model:Model ) {

		this.camera = camera
		this.domElement = domElement
		this.model = model

		this.zoomControls = new TrackballControls( this.camera, this.domElement )
		this.zoomControls.dynamicDampingFactor = .1
		this.zoomControls.noPan = true
		this.zoomControls.noRotate = true
		this.zoomControls.zoomSpeed = .3
		this.zoomControls.minDistance = 7
		this.zoomControls.maxDistance = 30
	
		this.rotateControls = new OrbitControls( this.camera, this.domElement )
		this.rotateControls.enablePan = false
		this.rotateControls.enableZoom = false
		this.rotateControls.enableDamping = true
		this.rotateControls.dampingFactor = .1
		this.rotateControls.rotateSpeed = .5
	
	}

	public lookAt = {
		
		monitor : () => {

			const screen = this.model.monitor.screen
			this.camera.position.set( screen.position.x, screen.position.y, screen.position.z + 10 )
			this.camera.lookAt( screen.position )
			this.zoomControls.target = this.rotateControls.target = screen.position
			this.rotateControls.minAzimuthAngle = -2
			this.rotateControls.maxAzimuthAngle = 2
			this.rotateControls.minPolarAngle = .3
			this.rotateControls.maxPolarAngle = 2
		
		}
	}

	public update() {

		this.zoomControls.update()
		this.rotateControls.update()

	}
}