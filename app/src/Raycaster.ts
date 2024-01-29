import Camera from "./Camera"
import Scene from "./Scene"
import Pointer from "./Pointer"
import { Object3D, Raycaster as raycaster } from 'three'

export default class Raycaster extends raycaster {

	private scene:Scene
	private pointer:Pointer
	public object:Object3D | null

	constructor( scene:Scene, camera:Camera ) {
		super()
		
		this.scene = scene
		this.camera = camera
		this.pointer = new Pointer
		this.object = null

	}

	public update() {

		this.setFromCamera( this.pointer, this.camera )

		const object = this.intersectObjects( this.scene.children, true )
	
		if ( object.length > 0 ) {

			if ( this.object != object[ 0 ].object ) {
	
				this.object = object[ 0 ].object

			}
	
		} else {

			if ( this.object != null ) this.object = null
				
		}
	
	}

}