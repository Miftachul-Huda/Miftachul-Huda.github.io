import Scene from "./Scene"
import Camera from "./Camera"
import { WebGLRenderer as renderer, ACESFilmicToneMapping } from "three"

export default class Renderer extends renderer {

	private scene:Scene
	private camera:Camera

	constructor( scene:Scene, camera:Camera ) {

		super( { antialias : true } )

		this.scene = scene
		this.camera = camera

		this.setPixelRatio( devicePixelRatio )
		this.toneMapping = ACESFilmicToneMapping
		this.toneMappingExposure = 1
		this.resize()

		document.body.append( this.domElement )
		window.addEventListener( 'resize', () => this.resize() )
		
	}

	public resize() {

		this.setSize( innerWidth, innerHeight )

	}
	
	public update() {

		this.render( this.scene, this.camera )

	}
}