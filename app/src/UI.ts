import URLs from './URLs'
import Scene from './Scene'
import Pointer from './Pointer'
import Controls from './Controls'
import Image from './Image'
import Video from './Video'
import Material from './Material'
import { Vector2, Vector3 } from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { damp2 } from 'maath/easing'

export default class UI {

	private url:URLs
	private scene:Scene
	private controls:Controls
	private image:Image
	private video:Video
	private material:Material
	private pointer:Pointer
	public monitorShow:Function
	public monitorHide:Function
	public update:Function

	constructor( scene:Scene, controls:Controls, image:Image, video:Video, material:Material ) {

		this.url = new URLs
		this.scene = scene
		this.controls = controls
		this.image = image
		this.video = video
		this.material = material
		this.pointer = new Pointer()

		this.monitorInit()
		this.monitorHide()

	}

	// ---- MONITOR UI ---- //

	private monitorInit() {

		const name = [
			'Agung Tech',
			'Buku Fisika',
			'Fuzzy',
			// 'Indiego',
			'Kuis Arab',
			'Phone Forest',
			// 'Premiere Tutorial',
			'Restoran',
			'Videografi',
			// 'WH Stitching'
		]

		const isVideoAvailable = [
			true, // Agung Tech
			true, // Buku Fisika
			true, // Fuzzy
			// true, // Indiego
			true, // Kuis Arab
			true, // Phone Forest
			// false, // Premiere Tutorial
			true, // Restoran
			true, // Videografi
			// false // WH Stitching
		]

		const link = [
			this.url.video.AgungTech,
			this.url.video.BukuFisika,
			this.url.video.Fuzzy,
			// this.url.video.Indiego,
			this.url.video.KuisArab,
			this.url.video.PhoneForest,
			// '',
			this.url.video.Restoran,
			this.url.video.Videografi,
			// ''
		]

		const github = [
			'',	// this.url.github.AgungTech,
			'',	// this.url.github.BukuFisika,
			'',	// this.url.github.Fuzzy,
			// '',	// this.url.github.Indiego,
			'',	// this.url.github.KuisArab,
			'',	// this.url.github.PhoneForest,
			// '',	// this.url.github.Premiere,
			'',	// this.url.github.Restoran,
			this.url.github.Videografi,
			// '',	// this.url.github.WHStitching
		]

		let listAt = -1
		let isVideoMap = false
		let isShowVideo = true
		let isShowImage = false
		
		// ---- MONITOR UI ----

		const _ui = document.createElement( 'ui' )
		_ui.setAttribute( 'monitor', '' )
		document.body.append(_ui)

		// ---- PREV NEXT BUTTON ----

		const _prev = document.createElement( 'button' )
		_prev.setAttribute( 'prev', '' )
		_prev.textContent = '<'
		_ui.append( _prev )

		const prev = () => this.image.prev()

		_prev.addEventListener( 'pointerdown', prev )

		const _next = document.createElement( 'button' )
		_next.setAttribute( 'next', '' )
		_next.textContent = '>'
		_ui.append( _next )

		const next = () => this.image.next()

		_next.addEventListener( 'pointerdown', next )

		const resizePrevNextButton = () => {

			if ( isShowImage ) {

				_prev.style.top = ( innerHeight / 2 ) - _prev.offsetHeight + 'px'
				_prev.style.left =  -( innerWidth / 2 ) + _prev.offsetWidth - 20 + 'px'
				_next.style.top = ( innerHeight / 2 ) - _next.offsetHeight + 'px'
				_next.style.left = ( innerWidth / 2 ) - _next.offsetWidth - 10 + 'px'
				_prev.style.opacity = _next.style.opacity = '1'

			} else {

				_prev.style.left =  -( innerWidth / 2 ) - _prev.offsetWidth - 40 + 'px'
				_next.style.left = ( innerWidth / 2 ) + _next.offsetWidth + 30 + 'px'
				_prev.style.opacity = _next.style.opacity = '0'

			}
		}

		resizePrevNextButton()

		// ---- BOTTOM LIST SHOW HIDE
		
		let _video:HTMLElement
		let _image:HTMLElement
		let _github:HTMLElement

		const showHideBottomList = () => {

			if ( listAt != -1 ) {


				_video.style.display = isVideoAvailable[ listAt ] == true ? '' : 'none'
				_image.style.display = ''
				_github.style.display = github[ listAt ] != '' ? '' : 'none'

			} else {

				_video.style.display = _image.style.display = _github.style.display = 'none'

			}
		}

		// ---- ITEM LIST VARIABLES ----

		let topItem:HTMLElement[] = []
		let bottomItem:HTMLElement[] = []


		// ---- CHANGE VIDEO OR IMAGE

		const changeVideoOrImage = () => {

			topItem[listAt].setAttribute( 'active', '' )

			if ( isShowVideo ) {

				if ( isVideoAvailable[ listAt ] ) {

					if ( !isVideoMap ) {
						this.material.changeScreenMap( this.material.screenVideoMap )
						isVideoMap = true
					}
					
					bottomItem[1].removeAttribute( 'active' )
					bottomItem[0].setAttribute( 'active', '' )
					this.video.change( link[listAt] )
				}
				else {
					
					this.image.change( -1 )
					isVideoMap = false

				}

			} else if ( isShowImage ) {

				bottomItem[0].removeAttribute( 'active' )
				bottomItem[1].setAttribute( 'active', '' )
				this.image.change( listAt )
			}
		
		}

		// ---- TOP LIST ----
		
		const _topList = document.createElement( 'list' )
		_topList.setAttribute( 'top', '' )
		_ui.append( _topList )

		let topListWidth = 0

		name.forEach( (v,i) => {

			topItem[i] = document.createElement( 'item' )
			_topList.append( topItem[i] )
			topItem[i].textContent = v

			topItem[i].addEventListener( 'pointerdown', () => {
				
				if ( listAt != -1 ) topItem[listAt].removeAttribute( 'active' )
				listAt = i
				
				if ( isShowVideo ) this.video.play()
				location.hash = `${ name[listAt] }|${ isShowVideo ? 'video' : 'image' }`

			} )

			topListWidth += topItem[i].offsetWidth

		} )

		_topList.style.width = topListWidth + 30 + 'px'
		_topList.style.marginLeft = (_topList.offsetWidth / -2) + 'px'

		// ---- BOTTOM LIST ----

		const bottomName = [
			'Video',
			'Image',
			'Github',
			'CV',
		]

		const bottomAction = [
			() => {
				this.video.play()
				location.hash = `${ name[ listAt ] }|video`
			},
			() => {
				location.hash = `${ name[ listAt ] }|image`
			},
			() => {
				if ( github[ listAt ] != '' ) window.open( github[ listAt ], '_blank' )
			},
			() => window.open( 'res/CV-2024.pdf', '_blank' )
		]

		const _bottomList = document.createElement( 'list' )
		_bottomList.setAttribute( 'bottom', '' )
		_ui.append( _bottomList )

		let bottomListWidth = 0

		bottomName.forEach( ( v, i ) => {

			bottomItem[i] = document.createElement( 'item' )
			_bottomList.append( bottomItem[i] )
			bottomItem[i].textContent = v

			bottomItem[i].addEventListener( 'pointerdown', () => bottomAction[ i ]() )

			bottomListWidth += bottomItem[i].offsetWidth

			if ( i == 0 ) _video = bottomItem[i]
			if ( i == 1 ) _image = bottomItem[i]
			if ( i == 2 ) _github = bottomItem[i]

		} )

		_bottomList.style.width = bottomListWidth + 13 + 'px'
		_bottomList.style.marginLeft = (_bottomList.offsetWidth / -2) + 'px'

		const bottomListResize = () => {

			_bottomList.style.top  = innerHeight - 38 + 'px'

		}

		showHideBottomList()
		bottomListResize()

		// ---- HASHTAG LISTENER ----

		const onHashChange = () => {

			const hash = location.hash.substring(1).replace( '%20', ' ' )
			const _name = hash.split( '|' )[0]
			const mode = hash.split( '|' )[1]
			const isFound = name.indexOf( _name )

			if ( isFound == -1 ) return
			if ( mode == 'video' && !isShowVideo ) {
				
				isShowVideo = true
				isShowImage = false
				resizePrevNextButton()

			} else if ( mode == 'image' && !isShowImage ) {

				isVideoMap = false
				isShowVideo = false
				isShowImage = true
				this.video.stop()
				resizePrevNextButton()
			}

			if ( mode == 'video' || mode == 'image' ) {

				listAt = isFound
				changeVideoOrImage()
				showHideBottomList()
			}
		}

		window.addEventListener('hashchange', onHashChange )

		// ---- SHOW HIDE UI ----

		let label

		const show = () => {

			if ( location.hash != '' ) onHashChange()
			else {

				listAt = 0
				location.hash = `${ name[listAt] }|${ isShowVideo ? 'video' : 'image' }`

			}

			label.hide()

			this.controls.lookAt.monitor()
			_ui.style.scale = '1'

		}

		const hide = () => {

			label.show()

			_ui.style.scale = '0'
		}

		this.monitorShow = show
		this.monitorHide = hide
		
		// ---- MONITOR LABEL ----

		label = this.createLabel( 'Show My Projects', new Vector3( 0, 19, -2.7 ), show )

		// ---- UPDATE TOP LIST ----

		let listTranslate = new Vector2()

		let isTouch = false
		let isTouched = false
		let lastX = 0, x = 0, lastTranslate = 0
		let minWidth = -_topList.offsetWidth / 2 + 60
		let maxWidth = _topList.offsetWidth / 2 + 50

		const update = deltaTime => {

			if ( isTouch ) {

				if ( isTouched ) {
					
					let _x = x - lastX + lastTranslate

					if ( _x < minWidth ) _x = minWidth
					if ( _x > maxWidth ) _x = maxWidth

					damp2( listTranslate, [ _x, 0 ], 200, deltaTime )

					_topList.style.transform = `translateX(${ listTranslate.x }px)`

				}

			} else {

				const x = -this.pointer.x * (_topList.offsetWidth / 2)

				damp2( listTranslate, [ x, 0 ], 200, deltaTime )
				
				_topList.style.transform = `translateX(${ listTranslate.x }px)`

			}
		}

		const setupTouch = () => {

			isTouch = true

			window.removeEventListener( 'touchstart', setupTouch )
			
		}

		window.addEventListener( 'touchstart', setupTouch )

		_topList.addEventListener( 'touchstart', e => {

			isTouched = true
			lastX = x = e.touches[0].clientX
			lastTranslate = listTranslate.x

		} )

		_topList.addEventListener( 'touchmove', e => {

			x = e.touches[0].clientX

		} )

		_topList.addEventListener( 'touchend', () => {
			
			isTouched = false

		 } )

		this.update = dt => update( dt )

		// ---- MONITOR RESIZE ----

		const onResize = () => {

			bottomListResize()
			resizePrevNextButton()

		}

		window.addEventListener( 'resize', onResize )

	}

	// ---- LABEL CREATOR ---- //

	private createLabel( name:string, position:Vector3, callback:Function ) {

		const _label = document.createElement( 'label' )
		const _name = document.createElement( 'name' )
		const label = new CSS2DObject( _label )

		_label.append( _name )
		this.scene.add( label )

		_name.textContent = name
		label.position.copy( position )

		const onHover = () => {
			
			_label.style.overflow = 'visible'
			_name.style.left = `${ ( _name.offsetWidth / -2 ) + ( _label.offsetWidth / 2 ) - 2 }px`
			_name.style.opacity = `1`
			_name.style.top = '-35px'
			
		}

		const onOut = () => {
			
			_label.style.overflow = 'hidden'
			_name.style.opacity = `0`
			_name.style.top = '-45px'

		}

		const onClick = () => {

			callback()

		}

		const show = () => {

			_label.style.opacity = '1'
			_label.style.display = ''
			_label.addEventListener( 'pointerover', onHover )
			_label.addEventListener( 'pointerout', onOut )
			_label.addEventListener( 'pointerdown', onClick )

		}

		const hide = () => {

			_label.style.opacity = '0'
			_label.style.display = 'none'
			_label.removeEventListener( 'pointerover', onHover )
			_label.removeEventListener( 'pointerout', onOut )
			_label.removeEventListener( 'pointerdown', onClick )

		}

		return { show, hide } 

	}
}