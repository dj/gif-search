const baseUrl = "https://api.giphy.com/v1/gifs/search"
// Testing only
const publicKey = "dc6zaTOxFJmzC"

export interface SearchParams {
    q: string
    limit?: number
    offset?: number
    fmt?: string
}

export interface Gif {
    url: string
    embed_url: string
    images: {
        fixed_height_still: {
            url: string
            width: string
            height: string
            size: string
            frames: string
            mp4: string
            mp4_size: string
            webp: string
            webp_size: string
        }
        fixed_height: {
            url: string
            width: string
            height: string
            size: string
            frames: string
            mp4: string
            mp4_size: string
            webp: string
            webp_size: string
        }
    }
}

export class Search {
    q: string
    limit: number
    offset: number
    fmt: string
    results: Gif[]
    cache: Map<string, Gif[]>

    constructor(params: SearchParams) {
        this.q = params.q
        this.limit = params.limit
        this.offset = params.offset
        this.fmt = params.fmt
    }

    private querystring() {
        let qs = `q=${encodeURIComponent(this.q)}&api_key=${publicKey}`
        if ( this.limit ) qs += `&limit=${this.limit}`
        if ( this.fmt ) qs += `&fmt=${this.fmt}`
        if ( this.offset ) qs += `&offset=${this.offset}`

        return `?${qs}`
    }

    send() {
        return fetch(baseUrl + this.querystring())
            .then(response => response.json()) // TODO err handling
            .then(function (json): Gif[] { return json.data })
            .catch(e => { throw e })
    }
}