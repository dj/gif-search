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
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.onChange.bind(this)
        this.onSubmit.bind(this)
        this.loadMore.bind(this)

        this.state = { 
            input: "",  
            results: [], 
            offset: 12
        }
    }

    onChange(e: React.FormEvent) {
        const input: string = (e.target as any).value;

        this.setState({
            input: input,
            results: this.state.results,
            offset: this.state.offset
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
                offset: self.state.offset
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
            offset: this.state.offset + 1
        })

        search.send().then(function (results: Gif[]) {
            self.setState({
                input: self.state.input,
                results: self.state.results.concat(results),
                offset: self.state.offset + limit + 1
            })
        })
    }

    render() {
        return (
            <div className="app">
                <form className="chat-input" onSubmit={ e => this.onSubmit(e) }>
                    <input type="text" 
                        value={ this.state.input } 
                        onChange={ e => this.onChange(e) } 
                        autoComplete="off" id="msg"/>
                    <input type="submit" value="Search" />
                </form>
                <ul className="result-list">
                    { this.state.results.map((res, i) => <Result data={res} key={i}/>) }
                </ul>
                <a href="#" onClick={ e => this.loadMore(e) }>Load More</a>
            </div>
        )
    }
}
