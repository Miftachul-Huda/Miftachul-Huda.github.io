import Scene from './Scene'
import Camera from './Camera'
import { WebGLRenderer, NoToneMapping } from 'three'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js'

export default class Renderer {

	private scene:Scene
	private camera:Camera
	public webgl:WebGLRenderer
	public css2d:CSS2DRenderer
	public css3d:CSS2DRenderer

	constructor( container:HTMLElement, scene:Scene, camera:Camera ) {

		this.scene = scene
		this.camera = camera

		this.webgl = new WebGLRenderer( { antialias : true } )
		this.webgl.setPixelRatio( devicePixelRatio )
		this.webgl.toneMapping = NoToneMapping
		this.webgl.toneMappingExposure = 1
		this.webgl.domElement.className = 'webgl'
		container.append( this.webgl.domElement )

		this.css2d = new CSS2DRenderer()
		this.css2d.domElement.className = 'css2d'
		container.append( this.css2d.domElement )

		this.css3d = new CSS3DRenderer()
		this.css3d.domElement.className = 'css3d'
		container.append( this.css3d.domElement )

		this.resize()
		window.addEventListener( 'resize', () => this.resize() )
		document.body.append( container )
		
	}

	public resize() {

		this.webgl.setSize( innerWidth, innerHeight )
		this.css2d.setSize( innerWidth, innerHeight )
		this.css3d.setSize( innerWidth, innerHeight )

	}
	
	public update() {

		this.webgl.render( this.scene, this.camera )
		this.css2d.render( this.scene, this.camera )
		this.css3d.render( this.scene, this.camera )

	}
}