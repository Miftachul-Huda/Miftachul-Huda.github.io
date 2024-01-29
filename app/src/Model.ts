import Loader from "./Loader"
import Material from "./Material"
import Scene from "./Scene"
import URLs from "./URLs"

export default class Model {

	private url:URLs
	private scene:Scene
	private glbLoader:Loader['glbLoader']
	private material:Material
	public monitor:any

	constructor( scene:Scene, glbLoader:Loader['glbLoader'], material:Material ) {

		this.url = new URLs
		this.scene = scene
		this.glbLoader = glbLoader
		this.material = material
		
		this.loadMonitor()

	}

	private loadMonitor() {

		this.glbLoader.load( this.url.monitor.glb, glb => {

			const screen:any = glb.scene.getObjectByName( 'Monitor_Screen' )
			const display:any = glb.scene.getObjectByName( 'Monitor_Display_LOW' )
			const stand:any = glb.scene.getObjectByName( 'Monitor_Stand_LOW' )

			this.monitor = { screen, display, stand }

			this.material.monitor( screen.material, display.material, stand.material )

			this.scene.add( glb.scene )
	
		} )

	}

}