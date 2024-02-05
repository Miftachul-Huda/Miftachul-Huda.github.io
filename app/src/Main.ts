import Stats from './Stats'
import Renderer from './Renderer'
import Scene from './Scene'
import Camera from './Camera'
import Controls from './Controls'
import Raycaster from './Raycaster'
import Environment from './Environment'
import Loader from './Loader'
import Model from './Model'
import Material from './Material'
import UI from './UI'
import Video from './Video'
import Animate from './Animate'
import FpsLimiter from './utils/FpsLimiter'
import Image from './Image'

export default class Main {

	private object = {
		root : document.documentElement,
		container : document.createElement( 'container' ),
		loader : document.querySelector( 'loader' ),
	}
	private fps = 60
	private isLoaded	= false
	private loader		= new Loader( this.object.loader )
	private scene			= new Scene
	private camera		= new Camera
	private stats			= new Stats
	private renderer 	= new Renderer( this.object.container, this.scene, this.camera )
	private raycaster = new Raycaster( this.scene, this.camera )
	private video 		= new Video()
	private material 	= new Material( this.loader.texLoader, this.video.el )
	private image 		= new Image( this.material, this.loader )
	private model 		= new Model( this.scene, this.loader.glbLoader, this.material )
	private controls 	= new Controls( this.camera.target, this.renderer.css2d.domElement, this.model )
	private ui 				= new UI( this.scene, this.controls, this.image, this.video, this.material )
	private animate 	= new Animate( this.object, this.controls, this.ui )
	
	constructor() {

		new Environment( this.scene, this.renderer.webgl, this.loader.texLoader )

		this.loader.onLoad = () => this.onLoad()

	}

	private onLoad() {

		if ( this.isLoaded ) return

		this.animate.onLoad()

		new FpsLimiter( deltaTime => this.update( deltaTime ), this.fps )

		this.isLoaded = true

	}

	private update( deltaTime:number ) {

		this.camera.update( deltaTime )
		this.controls.update()
		this.raycaster.update()
		this.renderer.update()
		this.stats.update()
		this.ui.update( deltaTime )
		
	}
}