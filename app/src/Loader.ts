import { LoadingManager, TextureLoader } from "three"
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default class Loader extends LoadingManager {

	private dracoLoader:DRACOLoader
	public glbLoader:GLTFLoader
	public texLoader:TextureLoader

	constructor() {
		super()
		
		this.texLoader = new TextureLoader( this )
		this.dracoLoader = new DRACOLoader( this )
		this.dracoLoader.setDecoderPath( 'lib/draco/' )
		this.glbLoader = new GLTFLoader( this )
		this.glbLoader.setDRACOLoader( this.dracoLoader )
		
	}
}