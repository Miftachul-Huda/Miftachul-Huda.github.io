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

export default class Main {

	private controls:Controls
	private raycaster:Raycaster
	private renderer:Renderer
	private stats:Stats
	private ui:UI
	
	constructor() {

		const loader = new Loader
		const scene = new Scene
		const camera = new Camera
		this.stats = new Stats
		this.ui = new UI( scene, camera )
		this.renderer = new Renderer( scene, camera )
		this.raycaster = new Raycaster( scene, camera )
		const video = new Video( this.raycaster )
		const material = new Material( loader, video.el )
		const model = new Model( scene, loader.glbLoader, material )
		this.controls = new Controls( camera, this.renderer.domElement, model )
		new Environment( scene, this.renderer, loader.texLoader )

		loader.onLoad = () => this.onLoad()

	}

	private onLoad() {

			this.controls.lookAt.monitor()

			const fps = ( 1 / 62 ) / 0.001

			requestAnimationFrame( time => this.update( fps, time ) )

	}

	private update( fps:number, time:number, tick:number = 0 ) {

		if ( time - tick >= fps ) {

			tick = time

			this.controls.update()
			this.raycaster.update()
			this.renderer.update()
			this.stats.update()
			this.ui.update()

		}

		requestAnimationFrame( time => this.update( fps, time, tick ) )

	}

}