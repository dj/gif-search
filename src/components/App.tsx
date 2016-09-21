import * as React from "react"
import { Search, SearchParams, Gif } from "../search"
import { Result } from "./Result"

export interface AppProps {
    key: string 
}

export interface AppState {
    input: string
    results: Gif[]
    offset: number
    autoplay: boolean
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.toggleAutoplay = this.toggleAutoplay.bind(this)
        this.loadMoreButton = this.loadMoreButton.bind(this)

        this.state = { 
            input: "",  
            results: [], 
            offset: 12,
            autoplay: false,
        }
    }

    onChange(e: React.FormEvent) {
        const input: string = (e.target as any).value;

        this.setState({
            input: input,
            results: this.state.results,
            offset: this.state.offset,
            autoplay: this.state.autoplay,
        })
    }

    onSubmit(e: React.FormEvent) {
        const self = this
        e.preventDefault()

        const search = new Search({ 
            q: this.state.input, 
            limit: 14 
        })

        search.send().then(function (results) {
            self.setState({
                input: self.state.input,
                results: results,
                offset: self.state.offset,
                autoplay: self.state.autoplay,
            })
        })
    }

    loadMore (e: React.FormEvent) {
        e.preventDefault()
        const self = this
        e.preventDefault()

        const limit = 7

        const search = new Search({ 
            q: this.state.input,
            limit: limit,
            offset: this.state.offset - 2
        })

        search.send().then(function (results: Gif[]) {
            self.setState({
                input: self.state.input,
                results: self.state.results.concat(results),
                offset: self.state.offset + limit,
                autoplay: self.state.autoplay,
            })
        })
    }

    toggleAutoplay() {
        this.setState({
            input: this.state.input,
            results: this.state.results,
            offset: this.state.offset,
            autoplay: !this.state.autoplay,
        })
    }

    private loadMoreButton() {
        if ( this.state.results.length ) {
            return <button class="load-more" href="#" onClick={ e => this.loadMore(e) }>Load More</button>   
        }
    }

    render() {
        return (
            <div className="app">
                <form className="search" onSubmit={ e => this.onSubmit(e) }>
                    <fieldset>
                        <label for="search-terms">Search Terms</label>
                        <input type="text" 
                            name="search-terms"
                            value={ this.state.input } 
                            onChange={ e => this.onChange(e) } 
                            autoComplete="off" id="msg"/>
                        <input type="submit" value="Search" />
                    </fieldset>
                    <fieldset>
                        <label><input type="checkbox"
                            defaultChecked={this.state.autoplay} 
                            onChange={this.toggleAutoplay} />Autoplay results?</label>
                    </fieldset>
                </form>
                <ul className="result-list">
                    { this.state.results.map((res, i) => <Result autoplay={this.state.autoplay} data={res} key={i}/>) }
                </ul>
                <div className="results-footer">
                    { this.loadMoreButton() }
                </div>
            </div>
        )
    }
}
