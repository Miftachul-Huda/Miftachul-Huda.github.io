import URLs from './URLs'
import Loader from './Loader'
import Scene from './Scene'
import Renderer from './Renderer'
import { Color, DirectionalLight, EquirectangularReflectionMapping, PMREMGenerator, PointLight, SRGBColorSpace, Texture } from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

export default class Environment {

	private texture:Texture

	constructor( scene:Scene, renderer:Renderer['webgl'], texLoader:Loader['texLoader'] ) {
		
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
		const lamp = new PointLight( 0xffffff, 400, 28, 1 )
		lamp.position.set( 0, 30, 20 )
		scene.add( lamp )
		const sun = new DirectionalLight( 0xffffff, 20 )
		// const sunHelper = new DirectionalLightHelper( sun )
		sun.position.set( 0, 30, 20 )
		sun.rotateX(45)
		scene.add( sun )

	}

	// private get create():Scene {

	// 	const intensity = 900
	// 	const scene = new Scene()
	// 	const geometry = new BoxGeometry()
	// 	geometry.deleteAttribute('uv')
	// 	const roomMaterial = new MeshStandardMaterial( { side: BackSide } )

	// 	const mainLight = new PointLight( 0xffffff, intensity, 28, 2 )
	// 	mainLight.position.set( 0.418, 16.199, 0.300 )
	// 	scene.add( mainLight )

	// 	roomMaterial.emissive.set( 0xffffff )
	// 	roomMaterial.emissiveMap = this.texture
	// 	roomMaterial.emissiveIntensity = 1
	// 	const room = new Mesh( geometry, roomMaterial )
	// 	room.position.set( - 0.757, 13.219, 0.717 )
	// 	room.scale.set( 31.713, 28.305, 28.591 )
	// 	scene.add( room )

	// 	// // -x right
	// 	// const light1 = new Mesh( geometry, this.createAreaLightMaterial( 50 ) );
	// 	// light1.position.set( - 16.116, 14.37, 8.208 );
	// 	// light1.scale.set( 0.1, 2.428, 2.739 );
	// 	// scene.add( light1 );

	// 	// // -x left
	// 	// const light2 = new Mesh( geometry, this.createAreaLightMaterial( 50 ) );
	// 	// light2.position.set( - 16.109, 18.021, - 8.207 );
	// 	// light2.scale.set( 0.1, 2.425, 2.751 );
	// 	// scene.add( light2 );

	// 	// // +x
	// 	// const light3 = new Mesh( geometry, this.createAreaLightMaterial( 17 ) );
	// 	// light3.position.set( 14.904, 12.198, - 1.832 );
	// 	// light3.scale.set( 0.15, 4.265, 6.331 );
	// 	// scene.add( light3 );

	// 	// +z
	// 	const light4 = new Mesh( geometry, this.createAreaLightMaterial( 43 ) );
	// 	light4.position.set( - 0.462, 8.89, 14.520 );
	// 	light4.scale.set( 4.38, 5.441, 0.088 );
	// 	scene.add( light4 );

	// 	// // -z
	// 	// const light5 = new Mesh( geometry, this.createAreaLightMaterial( 20 ) );
	// 	// light5.position.set( 3.235, 11.486, - 12.541 );
	// 	// light5.scale.set( 2.5, 2.0, 0.1 );
	// 	// scene.add( light5 );

	// 	// // +y
	// 	// const light6 = new Mesh( geometry, this.createAreaLightMaterial( 100 ) );
	// 	// light6.position.set( 0.0, 20.0, 0.0 );
	// 	// light6.scale.set( 1.0, 0.1, 1.0 );
	// 	// scene.add( light6 );

	// 	return scene
	// }

	// private createAreaLightMaterial( intensity:number ) {

	// 	const material = new MeshBasicMaterial()
	// 	material.color.setScalar( intensity )
	// 	return material
	
	// }
	
}