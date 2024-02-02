import lzma from './lzma-d.js'

export default (() => {

	var URL = window.URL || window.webkitURL

	var callback, time
	var results = {}
	var tmp = {}
	var urls = null
	var types = null

	var extract = {

		load: function (Urls, Types, Callback) {

			callback = Callback || function () { }

			urls = Urls !== undefined ? Urls : []
			types = Types !== undefined ? Types : []

			if (typeof urls === 'string' || urls instanceof String) urls = [urls]

			if (urls.length !== types.length) {
				for (var i = types.length; i < urls.length; i++) {
					types[i] = 0
				}
			}

			if (urls.length) {

				time = new Date().getTime()
				this.loadOne()

			}

		},

		loadOne: function () {

			var self = this

			var url = urls[0]
			var type = types[0]
			var name = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'))

			var xhr = new XMLHttpRequest()
			xhr.responseType = "arraybuffer"
			xhr.open('GET', url, true)

			xhr.onreadystatechange = function () {

				if (xhr.readyState === 2) {
				} else if (xhr.readyState === 3) { //  progress
				} else if (xhr.readyState === 4) {
					if (xhr.status === 200 || xhr.status === 0) self.decompact(xhr.response, name, type)
					else console.error("Couldn't load [" + name + "] [" + xhr.status + "]")
				}

			}

			xhr.send(null)

		},

		decompact: function (r, name, type) {

			var self = this
			lzma.decompress(new Uint8Array(r), function on_complete(r) { self.add(r, name, type) })

		},

		get: function (name) {

			if (tmp[name]) setTimeout(function () { this.revoke(name) }.bind(this), 100)
			return results[name]

		},

		revoke: function (name) {

			// clear garbage if blob
			if (!tmp[name]) return
			URL.revokeObjectURL(tmp[name])
			delete tmp[name]

		},

		add: function (r, name, type) {

			switch (type) {

				case 0: // for javascript root code
					tmp[name] = new Blob([r], { type: 'application/javascript' })
					var n = document.createElement("script")
					n.type = "module"
					n.crossOrigin = true
					n.src = URL.createObjectURL(tmp[name])
					document.head.append(n)
				break

				case 1: // for javascript root code
					var style = new CSSStyleSheet()
					style.replaceSync(r)
					document.adoptedStyleSheets = [style]
				break

				case 2: // for worker injection
					tmp[name] = new Blob([r], { type: 'application/javascript' })
					results[name] = URL.createObjectURL(tmp[name])
				break

				case 3: // only text 
					results[name] = r
				break
			}

			this.next()

		},

		getTime: function () {

			return time

		},

		next: function () {

			urls.shift()
			types.shift()

			if (urls.length === 0) {

				time = this.format_time(new Date().getTime() - time)

				callback(results)

			} else {

				this.loadOne()

			}

		},

		format_time: function (t) {

			if (t > 1000) return (t / 1000) + " sec"
			return t + " ms"

		},

	}

	return extract

})()