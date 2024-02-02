import { Vector2 } from 'three'

export default class Pointer extends Vector2 {

	public static Instance

	constructor() {

		if ( Pointer.Instance ) return Pointer.Instance

		super()
		
		Pointer.Instance = this
		
		document.addEventListener( 'mousemove', e => this.onPointerMove( e ) )

	}
	
	private onPointerMove( event:MouseEvent ) {

		this.x = ( event.clientX / innerWidth ) * 2 - 1
		this.y = - ( event.clientY / innerHeight ) * 2 + 1
	
	}
}