import Raycaster from "./Raycaster"
import URLs from "./URLs"

export default class Video {

	
	private list:Array<string>
	private listAt:number
	private raycaster:Raycaster
	public el:HTMLVideoElement

	constructor( raycaster:Raycaster ) {

		this.el = document.createElement('video')
		this.el.loop = true
		this.el.playsInline = true

		const url = new URLs
		this.list = [
			url.video.AgungTech,
			url.video.BukuFisika,
			url.video.Fuzzy,
			url.video.Indiego,
			url.video.KuisArab,
			url.video.PhoneForest,
			url.video.Restoran,
			url.video.Videografi
		]
		this.listAt = 0
		this.raycaster = raycaster

		window.addEventListener( 'dblclick', () => this.next() )

	}

	public change( url:string ) {
		
		this.el.src = url
		this.el.play()

	}

	public next() {

		const object = this.raycaster.object

		if ( object && object.name == 'Monitor_Screen' ) {

			this.change( this.list[ this.listAt ++ ] )

		}

		if ( this.listAt == this.list.length ) this.listAt = 0
	
	}
}