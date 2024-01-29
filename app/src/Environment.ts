import URLs from "./URLs"
import Loader from "./Loader"
import Scene from "./Scene"
import Renderer from "./Renderer"
import { Color, DirectionalLight, DirectionalLightHelper, EquirectangularReflectionMapping, PMREMGenerator, PointLight, SRGBColorSpace, Texture } from "three"
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
// import { DebugEnvironment } from 'three/addons/environments/DebugEnvironment.js'

export default class Environment {

	private texture:Texture

	constructor( scene:Scene, renderer:Renderer, texLoader:Loader['texLoader'] ) {
		
		// const debugEnv = new RoomEnvironment()
		const roomEnv = new RoomEnvironment( renderer )
		const pmremGenerator = new PMREMGenerator( renderer )
		scene.environment = pmremGenerator.fromScene( roomEnv ).texture
		scene.background = new Color( 0xaaaaaa )

		roomEnv.dispose()

		this.texture = texLoader.load( new URLs().env.Ennis )
		this.texture.mapping = EquirectangularReflectionMapping
		this.texture.colorSpace = SRGBColorSpace
		scene.background = this.texture
		scene.environment = this.texture
		const lamp = new PointLight( 0xffffff, 900, 28, 1 )
		lamp.position.set( 0, 30, 20 )
		scene.add( lamp )
		const sun = new DirectionalLight( 0xffffff, 20 )
		const sunHelper = new DirectionalLightHelper( sun )
		sun.position.set( 0, 30, 20 )
		sun.rotateX(45)
		scene.add( sun, sunHelper )

	}

}
