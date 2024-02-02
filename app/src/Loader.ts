import { LoadingManager, TextureLoader } from 'three'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default class Loader extends LoadingManager {

	private dracoLoader:DRACOLoader
	public glbLoader:GLTFLoader
	public texLoader:TextureLoader

	constructor( loader ) {
		super()
		
		this.texLoader = new TextureLoader( this )
		this.dracoLoader = new DRACOLoader( this )
		this.dracoLoader.setDecoderPath( 'lib/draco/' )
		this.glbLoader = new GLTFLoader( this )
		this.glbLoader.setDRACOLoader( this.dracoLoader )

		const title:HTMLElement = document.createElement( 'text' )
		title.textContent = 'PORTOFOLIO'
		title.setAttribute( 'title', '' )
		loader.append( title )

		const percent:HTMLElement = document.createElement( 'text' )
		percent.textContent = '0%'
		percent.setAttribute( 'percent', '' )
		loader.append( percent )

		const files:HTMLElement = document.createElement( 'text' )
		files.textContent = 'Loading: '
		files.setAttribute( 'files', '' )
		loader.append( files )

		this.onProgress = ( url, loaded, total ) => this.progress( percent, files, url, loaded, total )
	}

	private progress( percent:HTMLElement, files:HTMLElement, url:string, loaded:number, total:number ) {

		const percentage = ( loaded / total ) * 100
		url = url.split( '/' ).pop()

		percent.textContent = `${ percentage.toFixed() }%`
		files.textContent = `Loading: ${ url }`

	}
}