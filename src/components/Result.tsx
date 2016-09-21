import * as React from "react"
import { Gif } from "../Search"
import * as classNames from "classnames"

export interface ResultState {
    hover: boolean,
    videoLoaded: boolean
}

export interface ResultProps {
    data: Gif
}

export class Result extends React.Component<ResultProps, ResultState> {
    constructor(props: ResultProps) {
        super(props)
        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
        this.onVideoLoaded = this.onVideoLoaded.bind(this)

        this.state = {
            hover: false,
            videoLoaded: false
        }
    }

    onMouseEnter() {
        this.setState({ 
            hover: true,
            videoLoaded: this.state.videoLoaded
        })
    }

    onMouseLeave() {
        this.setState({ 
            hover: false,
            videoLoaded: this.state.videoLoaded
        })
    }

    onVideoLoaded() {
        console.log("video loaded!!")
        this.setState({ 
            hover: this.state.hover,
            videoLoaded: true
        })
    }

    render() {
        if (this.state.hover) {
            let style = {
                visibility: this.state.videoLoaded ? "visible" : "hidden"
            }
            console.log(style)
            return (
                <li className="result" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={style} >
                    <video autoPlay loop className="result__video" onLoadedData={this.onVideoLoaded} width={this.props.data.images.fixed_height.width} height={this.props.data.images.fixed_height.height} src={this.props.data.images.fixed_height.mp4}></video>
                </li>
            )
        } else {
            return (
                <li className="result" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <img className="result__img" width={this.props.data.images.fixed_height_still.width} height={this.props.data.images.fixed_height_still.height} src={this.props.data.images.fixed_height_still.url}></img>
                </li>
            )
        }
    } 
}