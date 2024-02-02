import URLs from './URLs'
import Loader from './Loader'
import Material from './Material'
import Scene from './Scene'

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
		
		this.loadModels()

	}

	private loadModels() {

		this.glbLoader.load( this.url.model.Portofolio, glb => {

			const screen:any = glb.scene.getObjectByName( 'Monitor_Screen' )
			const display:any = glb.scene.getObjectByName( 'Monitor_Display_LOW' )
			const stand:any = glb.scene.getObjectByName( 'Monitor_Stand_LOW' )
			const desk_base:any = glb.scene.getObjectByName( 'Desk_Base_LOW' )
			const desk_top:any = glb.scene.getObjectByName( 'Desk_Top_LOW' )
			const desk_bottom:any = glb.scene.getObjectByName( 'Desk_Bottom_LOW' )


			this.material.monitor( screen.material, display.material, stand.material )
			this.material.desk( desk_base.material, desk_top.material, desk_bottom.material )

			this.scene.add( glb.scene )
			this.monitor = { screen, display, stand }

		} )
	}
}