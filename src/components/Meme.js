import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([]) // initialize empty array
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes") // fetch request
        .then(res => res.json()) // resolve, then take response and parse JSON into JS
        .then(memesData => setAllMemes(memesData.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme, 
            randomImage: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    className="form-input" 
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                    className="form-input" 
                />
                <button 
                    className="button"
                    onClick={getMemeImage}
                >
                    Get a new meme image
                </button>
            </div>
            
            <div className="meme">
            <img src={meme.randomImage} className="meme-image" />
            <h2 className="top meme-text">{meme.topText}</h2>
            <h2 className="bottom meme-text">{meme.bottomText}</h2>
            </div>
        </main>
    )
}