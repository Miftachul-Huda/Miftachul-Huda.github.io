import { Vector2 } from "three"

export default class Pointer extends Vector2 {

	constructor() {
		super()
		
		document.addEventListener( 'mousemove', e => this.onPointerMove( e ) )

	}
	
	private onPointerMove( event:MouseEvent ) {

		this.x = ( event.clientX / innerWidth ) * 2 - 1
		this.y = - ( event.clientY / innerHeight ) * 2 + 1
	
	}
}