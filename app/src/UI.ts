import ThreeMeshUI from 'three-mesh-ui'
import URLs from './URLs'
import Scene from './Scene'
import Camera from './Camera'

export default class {

	private url:URLs
	private scene:Scene
	private camera:Camera
	private container:ThreeMeshUI.Block
	private text:ThreeMeshUI.Text

	constructor( scene:Scene, camera:Camera ) {

		this.url = new URLs
		this.scene = scene
		this.camera = camera

		this.container = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.7,
			padding: 0.2,
			fontFamily: this.url.font.Roboto.json,
			fontTexture: this.url.font.Roboto.png,
		})
		this.text = new ThreeMeshUI.Text({
			content: "Some text to be displayed"
		})
		this.container.add( this.text )
		this.container.position.set( 0, 20, 0 )
		this.scene.add( this.container )
		
	}

	public update() {

		this.container.lookAt(this.camera.position)
		ThreeMeshUI.update()
		
	}
}