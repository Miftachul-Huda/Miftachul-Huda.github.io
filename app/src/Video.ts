// import URLs from './URLs'
// import Raycaster from './Raycaster'

export default class Video {

	// private list:Array<string>
	// private raycaster:Raycaster
	public listAt:number
	public el:HTMLVideoElement

	constructor() {

		this.el = document.createElement('video')
		this.el.loop = true
		this.el.playsInline = true

		this.listAt = 0
		// const url = new URLs
		// this.list = [
		// 	url.video.AgungTech,
		// 	url.video.BukuFisika,
		// 	url.video.Fuzzy,
		// 	url.video.Indiego,
		// 	url.video.KuisArab,
		// 	url.video.PhoneForest,
		// 	url.video.Restoran,
		// 	url.video.Videografi
		// ]
		// this.raycaster = raycaster

		// window.addEventListener( 'dblclick', () => this.next() )

	}

	public change( url:string ) {
		
		this.el.src = url
		this.el.play()

	}

	public stop() {

		this.el.pause()

	}

	public play() {

		this.el.play()
		
	}

	// private next() {

	// 	const object = this.raycaster.object

	// 	if ( object && object.name == 'Monitor_Screen' ) {

	// 		this.change( this.list[ this.listAt ++ ] )

	// 	}

	// 	if ( this.listAt == this.list.length ) this.listAt = 0
	
	// }
}